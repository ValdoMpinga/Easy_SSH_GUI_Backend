# Easy SSH: Backend

> Status: Developed


![easy_ssh](https://user-images.githubusercontent.com/76015450/178142965-7970d8c4-a2e9-4e0b-8b5d-af85ad59c9b7.png)


##  Backend made in node.js from a an app which uses open ssh to communicate to other machihes.

Easy SSH is a web application that connects the user to a remote machine on the same network using Open SSH.

The core of Easy SSH is <a href="https://www.npmjs.com/package/ssh2shell">ssh2shell</a> , which is a library built on coffee scripts for Node.js that allows
you to make connections to one or more machines and execute multiple commands sequentially and, if necessary, execute them based on previously executed commands.

# Architecture

![arch](https://user-images.githubusercontent.com/76015450/178143093-0bb96b57-0ae5-4797-b7d0-52e3a90690c1.png)
