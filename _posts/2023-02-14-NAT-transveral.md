---
title: 如何优雅地通过远程设备写代码
date: 2023-02-15
categories:
  - Blog
tags:
  - Coding Efficiency
comments: true
toc: true
toc_sticky: true
---

最近一两年因为疫情的影响，Work from Home 成为了大家的新常态。然而，工作代码和数据通常都存在公司/学校的机器上，这就导致了一个问题：如何在家里访问公司/学校的机器呢？最简单粗暴的方法自然是用 TeamViewer, AnyDesk, 向日葵这类软件来控制机器，并直接在远程桌面上进行开发。但是，一方面出于安全考虑，不少机构（例如我们实验室）会禁止使用这些软件；另一方面，直接用这些软件来进行远程开发的体验也不是很好，往往伴随着卡顿、延迟等问题。因此，我们需要一种更优雅的方案来解决远程开发的需求，那就是 VS Code + SSH + 内网穿透。

## 什么是内网穿透？

那么，什么是内网穿透呢？我们有请 ChatGPT 来解释一下吧！😆

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/45810070/218642230-8f2b4b57-576b-48b0-8e66-628a9799cecf.png" alt="ChatGPT-Answer-of-NAT-transveral" style="margin-bottom: 20px; border: 1px solid black;">
</div>

## 如何配置内网穿透？

[ZeroTier](https://www.zerotier.com/) 的免费版最大可支持 25 个节点设备的内网穿透，可以轻松满足简单的日常开发需求。

- 我们首先需要在[官网](https://www.zerotier.com/)注册一个账号，登陆后点击 **Create A Network** 来创建一个新的网络，并记录下该网络的 Network ID。

  <div style="text-align:center;">
    <img src="https://user-images.githubusercontent.com/45810070/218676980-7627abcc-8ee9-461b-8a71-da302a463380.jpg" alt="Network-ID" style="margin-bottom: 20px; border: 1px solid black;">
  </div>

- 然后分别在需要远程开发的两台机器上安装 ZeroTier 客户端，安装方法如下：

  我的主力机器是 Ubuntu 22.04 系统，可以按照以下方法安装 ZeroTier 客户端：

  ```bash
  curl -s https://install.zerotier.com | sudo bash
  ```

  我的笔记本是 Windows 11 系统，[官网](https://www.zerotier.com/download/)提供了 Windows 客户端的安装包，可以直接下载安装。如果你使用其他支持的系统，也可以在[官网](https://www.zerotier.com/download/)找到对应的安装包。

- 安装完成后，我们需要将两台机器加入到同一个 ZeroTier 网络中，方法如下：

  - 在 Ubuntu 系统上，可以运行以下命令：

    ```bash
    sudo zerotier-cli join <Network ID>
    ```

    其中 `<Network ID>` 为刚刚创建的网络的 Network ID。

  - 在笔记本上，打开 ZeroTier 客户端，点击 **Join New Network**，在弹出的对话框中输入刚刚创建的网络的 Network ID，点击 **Join**。

    <div style="text-align:center;">
      <img src="https://user-images.githubusercontent.com/45810070/218762377-fcad61c1-dac3-4db5-99cb-75def78a0a5f.png" alt="Join-a-Network" style="margin-bottom: 20px; border: 1px solid black;">
    </div>

  - 出于安全考量，ZeroTier 默认创建私有访问权限的网络，即只有加入该网络的设备才能互相访问。因此，我们需要将两台机器的访问权限设置为公开访问。我们只需要登陆 ZeroTier 网站，然后找到刚刚创建的网络，并在 **Members** 中找到已加入该网络的两台机器，并将 **Auth?** 栏打勾即可。我们可以在 **Managed IPs** 栏中看到给两台机器自动分配的内网 IP 地址（当然，你也可以手动设置不同的地址）。

    <div style="text-align:center;">
      <img src="https://user-images.githubusercontent.com/45810070/218682174-40c6f0c2-c3ca-404b-b57e-ad48e7466b00.png" alt="Tick-Auth" style="margin-bottom: 20px; border: 1px solid black;">
    </div>

- 至此，我们已经完成了内网穿透的配置。我们可以在两台机器上分别运行以下命令来测试一下：

  ```bash
  ping <IP Address>
  ```

  其中 `<IP Address>` 为刚刚在 Managed IPs 栏中看到的内网 IP 地址。如果能够正常 ping 通，说明内网穿透已经配置成功。

**注意:** 在 Ubuntu 系统中，如果之前已经安装过 ZeroTier 客户端，或通过其他方式，例如 Snap, 安装了 `zerotier-cli` 命令，则必须先卸载干净其他版本，并彻底删除 `/var/lib/zerotier-one` 目录，然后再按照上述方法安装 ZeroTier 客户端。
{: .notice--danger}

- 如果遇到 `401 join {}` 错误，可以尝试运行以下命令清空 Authorization Token，并重启服务解决：

  ```bash
  rm -rf /var/lib/zerotier-one/authtoken.secret
  sudo systemctl restart zerotier-one
  ```

- 如果遇到以下报错：

  ```bash
  zerotier-one.service: Service hold-off time over, scheduling rest
  zerotier-one.service: Scheduled restart job, restart counter is a
  Stopped ZeroTier One.
  zerotier-one.service: Start request repeated too quickly.
  zerotier-one.service: Failed with result 'exit-code'.
  Failed to start ZeroTier One.
  ```

  很可能是因为系统中存在多个版本的 ZeroTier 客户端，例如 Snap 版本，我们可以尝试卸载 Snap 版本的 ZeroTier 客户端：

  ```bash
  sudo snap remove zerotier-one
  ```

遇到其它问题也可以在 ZeroTier 的官方 [Issue](https://github.com/zerotier/ZeroTierOne/issues) 中搜索。

## 如何通过 VS Code 进行远程开发？

[VS Code](https://code.visualstudio.com/) 是一款非常优秀的开发工具，丰富的插件和功能极大地增加了它的可扩展性。通过 [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) 插件，我们可以在本地开发环境中，通过 SSH, Docker 或 WSL 等方式，连接到远程服务器并直接使用远程服务器的硬件资源进行开发。

<div style="text-align:center;">
      <img src="https://user-images.githubusercontent.com/45810070/218764813-c3b169bb-d835-415e-b181-ab8e02bff15b.png" alt="Remote-Dev-Extension" style="margin-bottom: 20px; border: 1px solid black;">
</div>

安装完 Remote Development 插件后，我们就可以通过 SSH 的方式连接到远程服务器进行开发了：

- 首先，我们需要配置 SSH 连接到远程服务器的信息。如下图我们可以依次打开 Remote Explorer 插件，并打开 SSH Config 文件。

  <div style="text-align:center;">
        <img src="https://user-images.githubusercontent.com/45810070/218765772-a08408cc-d5b9-4cf5-95f2-7b9ef06bbc0a.png" alt="Remote-Dev-Extension" style="margin-bottom: 20px; border: 1px solid black;">
  </div>

  然后，我们在打开的 [SSH Config](https://linux.die.net/man/5/ssh_config) 文件中，添加以下内容：

  ```shell
  Host Work # 远程机器的别名
    HostName 192.168.194.174 # 分配的内网 IP 地址
    Port 2222 # 远程机器的 SSH 端口号
    User xinyu # 远程机器的用户名
  ```

  其中 HostName 是我们在内网穿透中给远程服务器分配的内网 IP 地址，Port 是远程服务器的 SSH 端口号（使用 Zotier 进行内网穿透时，默认服务器的 SSH 端口号为 2222），User 是远程服务器的用户名。配置完成后，我们可以在 Remote Explorer 插件中看到我们刚刚添加的服务器了！双击即可连接到远程服务器，然后我们就可以像在本地一样流畅地使用远程机器进行开发了。

💡 另外，为了方便起见，我们可以配置 SSH 的免密登录，这样就不需要每次连接远程服务器时都输入密码了。
{: .notice--info}

```bash
# 在本地生成 SSH 密钥对
ssh-keygen
# 将公钥复制到远程服务器
ssh-copy-id -i ~/.ssh/id_rsa.pub xinyu@192.168.194.174
```

至此，我们就可以愉快地使用 VS Code 进行远程开发了！🎉🎉🎉

<div style="text-align:center;">
        <img src="https://user-images.githubusercontent.com/45810070/218771838-a4c81287-7a0c-466c-b26c-60aa620eb2b1.png" alt="Example-Remote-Dev" style="margin-bottom: 20px; border: 1px solid black;">
</div>
