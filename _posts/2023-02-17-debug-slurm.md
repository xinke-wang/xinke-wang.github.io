---
title: 如何使用 VS Code 调试 Slurm 计算节点
date: 2023-02-17
categories:
  - Blog
tags:
  - Coding Efficiency
comments: true
toc: true
toc_sticky: true
---


[SLURM](https://slurm.schedmd.com/) (Simple Linux Utility for Resource Management) 是一款开源的高度可扩展的资源管理和任务调度系统，被广泛应用于 HPC 集群中。SLURM 管理的集群一般由若干管理（登陆）节点和若干计算节点组成。通常，我们在管理节点上提交任务后，调度系统会自动将任务分配到空闲的计算结点上执行。通常来说，为了安全起见，计算结点是断开公网连接的，因此我们无法直接在本地通过 SSH 进行连接。这使得我们在调试计算节点上的程序时，无法充分利用 IDE 的调试功能，而只能通过 `pdb` 及 `print` 等方式进行调试，极大地降低了调试效率。而在本地机器上进行调试的话，则可能受限于硬件的限制，例如，本地机器不一定有多卡 GPU，也不一定有足够的内存/显存等。因此，我们需要一种方法，能够在本地机器上利用集群的计算结点资源进行调试。

## 背景

我们知道 VS Code 的 Remote Development 插件可以允许我们在本地机器上通过 SSH 连接到远程机器上进行开发。然而，通过常规的 SSH 配置我们只能登陆到管理节点上:

```bash
Host HPC
    HostName hpc.xxx.edu.au
    User xxx
```

尽管我们可以在管理节点上运行 ```srun``` 命令来启动一个计算节点：

```bash
srun --gres=gpu:1 -n2 -N1 --mem-per-cpu=32G --pty $SHELL
```

但在这种情况下按下 `F5` 时，VS Code 会重新在**管理节点**上启动一个新的调试终端，并尝试在这个新的终端上运行我们的程序。这样的话，我们仍然无法使用计算节点上的 GPU 等资源进行调试。

以上这个问题在 VS Code 官方 [issue#1722](https://github.com/microsoft/vscode-remote-release/issues/1722) 中已经讨论了数年之久（从 2019 年 10 月提出，直到 2023 年仍然有新的回复）。我也曾经深受这个问题的困扰，尽管在网上搜索，或者问身边的同学朋友，都一直没能够得到一个有效的解决方案。

<div style="text-align:center;">
        <img src="https://user-images.githubusercontent.com/45810070/219606314-6025a201-053c-481b-a1e1-4ca78fcd0c94.png" alt="Example-Remote-Dev" style="margin-bottom: 20px; border: 1px solid black;">
</div>

最近回想起这个问题时，再次浏览 [issue#1722](https://github.com/microsoft/vscode-remote-release/issues/1722) 时，发现已经有了解决方案。因此，我将这个方法记录在这里，以供参考。

## 解决方案

这个解决方案非常简单，即以管理节点作为跳板机，将计算节点的输入和输出转发到本地端口。

- 首先，我们在本地机器上添加一个新的 SSH 配置（如果你还不了解如何在 VS Code 通过 Remote Explorer 修改 SSH config 的话，可以先参考「[如何优雅地通过远程设备写代码](https://xinke-wang.github.io/blog/NAT-transveral/)」），用于从本地连接到管理节点：

    ```bash
    Host HPC
        HostName hpc.xxx.edu.au
        User xxx
    ```

- 然后我们需要在计算节点上启动一个 shell 脚本，用以获取分配给我们的计算资源，例如我们可以通过以下命令获取两块 GPU 计算资源（或者你可以申请任意你需要的资源）：

  ```bash
  srun --gres=gpu:2 -n1 -N1 --mem-per-cpu=32G --pty $SHELL
  ```

- 运行完以上命令后，我们在命令行中已经登陆到了计算节点上，接着我们可以通过 `hostname` 命令来查看该节点的主机名：

  ```bash
  hostname
  # 你可能会看到类似于以下的输出：
  compute01-hpc.xxx.edu.au
  ```

- 此时我们就可以继续在本地机器上添加计算节点的 SSH 配置了：

  ```bash
  # 管理节点
  Host HPC
      HostName hpc.xxx.edu.au
      User xxx
  
  # 计算节点
  Host compute01
      HostName compute01-hpc.xxx.edu.au # 获取自 hostname 命令
      User xxx
      ProxyCommand ssh -W %h:%p HPC # 名称同管理节点的 Host
  ```

  至此，我们就可以直接在 VS Code 中通过 Remote Explorer 连接到计算节点上并进行调试了！🪅🪅🪅

❗但是，仍然有以下几点注意事项
{: .notice--danger}

- 每一次通过 VS Code 连接至计算节点调试前，我们都需要先在计算节点上提交一个任务来获取计算资源（例如，上文中使用的 `srun` 命令），否则 SLURM 系统会拒绝我们的连接请求。

  ```bash
  Access denied by pam_slurm_adopt: you have no active jobs on this node
  Authentication failed.
  ```

- 如果有多个不同的计算节点，不要忘记修改计算节点的 SSH 配置中的 `HostName` 为对应的主机名。

- 在初次运行时，VS Code 可能会自动同步你的本地插件，如果你的计算节点本身是断网的，那么由于端口转发的延迟，这个过程可能会持续很长时间，因此请耐心等待。
