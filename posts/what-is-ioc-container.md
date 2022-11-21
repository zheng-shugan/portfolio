---
title: '什么是 IOC 容器'
date: '2022-11-21'
---

## 什么是 IOC 容器

举个例子：

```typescript
class Person { 
    name: string  
    age: number  
    
    constructor(name: string, age: number) {  
        this.name = name  
        this.age = age  
    }  
}  
// Player 类强耦合 Person 类  
// 随着业务复杂度的增加，维护成本和代码可读性都会越来越差  
class Player {  
    salary: number  
    info: Person  
    
    constructor(salary: number) {  
        this.salary = salary  
        this.info = new Person("zzzzsg", 20)  
    }  
}
```

可以看到 `Player` 类和 `Person` 类是强耦合的，在后续的代码编写中如果我们对 `Perosn` 类中添加新功能不可避免的会对 `Player` 类造成影响，这就违背了软件开发原则中的 OCP 原则（Open Close Principle）_：对扩展开放，对修改关闭，同时也违背了依赖倒置原则（Dependence Inversion Principle）_。
依赖倒置原则强调**面向抽象编程、面向接口编程**，让上层不依赖下层，下层的变动不会影响到上层。这样就可以大大的降低了代码之间的耦合度，扩展力也就更强了，能复用的代码也就更多了。
而 *IoC* 控制反转就是解决这个问题的一种思想，也是一种软件的设计模式：

- 控制反转是一种思想
- 控制反转是为了降低程序之间的耦合度，提高程序扩展能力，达到 OCP 和 DIP 原则
- 控制反转，反转了什么东西？
  - 将对象的创建对权利交出去，交给第三方容器管理
  -   将对象和对象之间的维权交出去，给第三方容器管理
- 怎么实现控制反转
  - 依赖注入（Dependence Injection）
  
  IOC 也只是一种类似 Map 的容器，我们将需要的对象注入到容器中然后通过对象的 Key 来获取到需要的对象，其实就是实现了一个容器来收集依赖用来解耦合减少维护成本。
      例如以下的代码就实现了一个 IOC 容器收集依赖的例子：

```typescript
class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

class Studnet {
  id: string
  name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}

// IoC 容器，用来收集依赖
class Container {
  modules: any

  constructor() {
    this.modules = {}
  }

  provide(key: string, modules: any) {
    this.modules[key] = modules
  }

  get(key: string) {
    return this.modules[key]
  }
}

const mo = new Container() // new 一个 IOC 容器
// 向容器中注入对象
mo.provide("animal", new Animal("老虎"))
mo.provide("stu", new Studnet("001", "zzzsg"))

class Test {
  animal: Animal
  student: Studnet

  constructor(container: Container) {
    // 从容器中获取对象
    this.animal = container.get("animal")
    this.student = container.get("stu")
  }
}

const test: Test = new Test(mo)
console.log(test.animal.name)   // 老虎
console.log(test.student.name)  // zzzsg
```
