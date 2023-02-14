---
title: 如何优雅地通过远程设备写代码
last_modified_at: 2023-02-14
categories:
  - Blog
tags:
  - Coding Efficiency
comments: true
---

最近一两年因为疫情的影响，Work from Home 成为了大家的新常态。然而，工作代码和数据通常都存在公司/学校的机器上，这就导致了一个问题：如何在家里访问公司/学校的机器呢？最简单粗暴的方法自然是用 TeamViewer, AnyDesk, 向日葵这类软件来控制机器，并直接在远程桌面上进行开发。但是，一方面出于安全考虑，不少机构（例如我们实验室）会禁止使用这些软件；另一方面，直接用这些软件来进行远程开发的体验也不是很好，往往伴随着卡顿、延迟等问题。因此，我们需要一种更优雅的姿势来实现远程写代码这个基本需求。那就是通过 Vscode 的 Remote Development 插件 + 内网穿透来实现远程开发。

## 什么是内网穿透？

那么，什么是内网穿透呢？我们有请 ChatGPT 来解释一下吧！😆

<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/45810070/218642230-8f2b4b57-576b-48b0-8e66-628a9799cecf.png" alt="ChatGPT-Answer-of-NAT-transveral" style="margin-top: 20px; margin-bottom: 20px; border: 1px solid black;">
</div>

## 如何配置内网穿透？

[ZeroTier](https://www.zerotier.com/) 的免费版最大可支持 25 个节点设备的内网穿透，可以轻松满足简单的日常开发需求。

- 我们首先需要在[官网](https://www.zerotier.com/)注册一个账号，登陆后点击 **Create A Network** 来创建一个新的网络，并记录下该网络的 Network ID。

  <div style="text-align:center;">
    <img src="https://user-images.githubusercontent.com/45810070/218676980-7627abcc-8ee9-461b-8a71-da302a463380.jpg" alt="Network-ID" style="margin-top: 20px; margin-bottom: 20px; border: 1px solid black;">
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

  - 在笔记本上，打开 ZeroTier 客户端，点击 **Join a Network**，输入刚刚创建的网络的 Network ID，点击 **Join**。

    <div style="text-align:center;">
      <img src="https://user-images.githubusercontent.com/45810070/218677000-7b0b0b8a-8ee9-4b9e-8b1a-3b0b0b2b0b0b.jpg" alt="Join-a-Network" style="margin-top: 20px; margin-bottom: 20px; border: 1px solid black;">
    </div>

  - 出于安全考量，ZeroTier 默认创建私有访问权限的网络，即只有加入该网络的设备才能互相访问。因此，我们需要将两台机器的访问权限设置为公开访问。我们只需要登陆 ZeroTier 网站，然后找到刚刚创建的网络，并在 **Members** 中找到已加入该网络的两台机器，并将 **Auth?** 栏打勾即可。我们可以在 **Managed IPs** 栏中看到给两台机器自动分配的内网 IP 地址（当然，你也可以手动设置不同的地址）。

    <div style="text-align:center;">
      <img src="https://user-images.githubusercontent.com/45810070/218682174-40c6f0c2-c3ca-404b-b57e-ad48e7466b00.png" alt="Tick-Auth" style="margin-top: 20px; margin-bottom: 20px; border: 1px solid black;">
    </div>

- 至此，我们已经完成了内网穿透的配置。我们可以在两台机器上分别运行以下命令来测试一下：

  ```bash
  ping <IP Address>
  ```

  其中 `<IP Address>` 为刚刚在 Managed IPs 栏中看到的内网 IP 地址。如果能够正常 ping 通，说明内网穿透已经配置成功。

**注意:** 在 Ubuntu 系统中，如果之前已经安装过 ZeroTier 客户端，或通过其他方式，例如 Snap, 安装了 `zerotier-cli` 命令，则必须先卸载干净其他版本，并彻底删除 `/var/lib/zerotier-one` 目录，然后再按照上述方法安装 ZeroTier 客户端。
{: .notice--info}

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

## 如何通过 Vscode 进行远程开发？
