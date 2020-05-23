---
title: '《TypeScript实战》学习笔记'
date: 2020-05-08
tags:
 - typescript
categories: 
 - 前端相关
---

> 主要标记TS中与JS不同的部分

## 认识TS的简单语法

### 声明变量

```typescript
// let 或 var  变量名: 数据类型 = 初始化值
// 例子
let varName: string = "hello world";
```

**问题：如果不声明类型会如何？**

## 类型

### 基础类型

1. 数值型：number

   ```typescript
   let num1: number = 89.2; // 小数与分数
   let num1: number = 2; // 整数
   let num1: number = 0b1010;   // 二进制
   let num1: number = 0o744;    // 八进制
   let num1: number = 0x744;    // 十六进制
   ```

   **Number和JS中一样是number类型封装的对象，与number并不完全相同**

2. 布尔类型：boolean

   ```typescript
   let isMan : boolean  = true;
   let isBoy : boolean  = false;
   let a: boolean = new Boolean(1); // 报错
   let a: boolean = Boolean(1); // true
   ```

   **同样注意Boolean和boolean的区别**

3. 字符串

   沿用JS的拼接，运算和反引号`组成的模板字符串。

#### 枚举

**TS支持枚举类型**

为一组数组赋予更加友好的名称，提高代码的可读性。

```typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}
let today: Days = Days.Sun;
```

可以查看转换为JS的代码

```js
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
var today = Days.Sun;
console.log(today);
```

**从转换后的代码可以看出，实际为索引和字符串的双向绑定**

常量枚举： 编译阶段删除

```typescript
const enum Directions {
    Up, 
    Down,
    Left,
    Right
}
let directions: Directions = Directions.Up;
// 转换为JS代码
var directions = 0 /* Up */;
```

### 任意值：any

相当于JS中的动态类型，**方便和JS的库进行交互**，但是需要注意一点：**动态类型不能识别类型，故编辑器无法展示其可以使用的方法（自动补全）， 编译器无法进行方法调用检查。**

```typescript
let notSure: any = 4;
notSure.ifItExists();  // 可能存在此方法，可能不存在
notSure.toFixed();
let Sure: Object = 4;
Sure.toFixed(); // 编译报错，Obj没有此方法
```

any类型也常用语数组的定义

```typescript
let list: any[] = [1, true, "free"];
```

### 空值、Null和Undefined

**这三个类型在JS中极其混乱，TS对其进行了严格的规范，此为TS的一个较大的特点**

1. 空值：void

   ```typescript
   // 定义返回值的类型
   function hello():void {
       console.log("void 类型");
   }
   ```

2. null

   null表示不存在对象值，一般来当做值来用，不当做类型来使用（null类型只能赋值为null, undefined和any）

   ```typescript
   let uv: null = null;
   let uv2: null = undefined;
   let uv3: null = 2; // 错误
   let a: any = 2;
   uv = a; // 正确
   ```

3. undefined

   undefined表示已经声明但是尚未初始化变量的值，一般来当做值来用，不当做类型来使用（null类型只能赋值为null, undefined和any）

### Never

never类型表示从不会出现的值，一般用于函数抛出异常Error或存在无法正常结束的情况。

### Symbols

JS在ES6中加入的语法，表示独一无二的值，**一旦创建就不能变更，且不能设置属性**，一般是用作对象的一个属性。

### 交叉类型

将多个类型合并为一个类型，**合并后的交叉类型包含了其中的所有类型的特性**

```typescript
class Car {
  public driveOnRoad() {
      console.log("can drive on road");
  }
}
class Ship {
  public driveInWater() {
      console.log("can drive in water");
  }
}
let car = new Car();
let ship = new Ship();
// 交叉类型
let carShip: Car & Ship = <Car & Ship> {};
carShip["driveOnRoad"] = car["driveOnRoad"];
carShip["driveInWater"] = ship["driveInWater"];
carShip.driveOnRoad();
carShip.driveInWater();
```

**问题：代码字面意思能够理解，看下面编译后的结果，此交叉类型的效果并未看到**

```typescript
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.driveOnRoad = function () {
        console.log("can drive on road");
    };
    return Car;
}());
var Ship = /** @class */ (function () {
    function Ship() {
    }
    Ship.prototype.driveInWater = function () {
        console.log("can drive in water");
    };
    return Ship;
}());
var car = new Car();
var ship = new Ship();
// 交叉类型
var carShip = {}; // 此处只是简单的定义了一个空对象
carShip["driveOnRoad"] = car["driveOnRoad"];
carShip["driveInWater"] = ship["driveInWater"];
carShip.driveOnRoad();
carShip.driveInWater();
```

### Union类型

对于类型来说，表示或

```typescript
function() padLeft(value:string, padding: number | string) {
    // padding 可以使用数字  100 也可以使用string  "100px"
}
```

对于类来说，表示公共的方法

```typescript
class Car {
  public driverOnRoad() {
      console.log("Can drive on road");
  }
  public toUppper(str:string) {
      return str.toUpperCase();
  }
}
class Ship {
  public driverInWater() {
      console.log("Can drive in water");
  }
  public toUppper(str:string) {
      return str.toUpperCase();
  }
}
let car = new Car();
let ship = new Ship();
let carShip: Car|Ship = <Car | Ship>{};
carShip["driverInWater"] = ship["driverInWater"];
carShip["driverOnRoad"] = ship["driverOnRoad"];
carShip["toUppper"] = ship["toUppper"];
console.log(carShip.toUppper("test"));
carShip.driverInWater();  // 编译时会报错
(<Ship>carShip).driverInWater(); // 此处使用的是断言语法
// 以上两种表示其实对应的JS是相同的东西，区别在与TS中的表示很严格，在编译到JS的过程中可以插入检查的语句
```

### 断言

类型断言可以用来手动指定一个值的类型，存在两种语法。**常和联合类型一起使用，参考上面的程序**

- <类型>值或者对象

- 值或者对象 as 类型  （在tsx中必须使用这一种，不然会和标签语法冲突）

  ```typescript
  function getLength(a: string| number):number {
    if((<string>a).length) {
      return (<string>a).length;
    } else {
      return a.toString().length;
    }
  }
  ```

**断言不是静态语言中的类型转换！只是在编译到JS的过程中对类型进行的判断，在使用中，需结合判断语句进行执行，避免出现引用错误**

**对于非联合类型，需要先转换为unknow类型，再进行断言 `<type><unknow>标识符` **

## 对象

### 创建

```typescript
// 注意属性的类型
let name ={
    props1: "",
    props2: "",
    props3: "",
    // 尽量使用匿名方法,避免命名污染
   	func1: function() {
        
    }
}
```

### 添加属性

**区别与JS**

对于类

```typescript
let student = {
    code: "3118104015",
    name: "zzxiongfan",
    age: "25",
    getScore: function () {
        return {
            math: "100",
            english: "60",
        }
    }
}
```

JS可以直接添加,没有语法错误,对应到JS增加对象的属性

```js
// JS添加属性
student.walk = function () {
    console.log("walk");
}
```

TS上述方法会报错

1. 通过提前声明属性解决

   ```typescript
   let student = {
       // 上面的内容
       walk: function() {}
   }
   student.walk = function () {
       console.log("walk");
   }
   // 这种办法的原理是将属性先声明,再更改属性的引用
   ```

2. 定义与对象的同名接口

   ```typescript
   let student = {};
   // 定义接口
   interface student {
       [key: string]: any
   }
   // 添加属性
   student["height"] = 172;   // 不能使用.运算符: Student.height
   student["weight"] = 65;
   // 添加方法
   student["walk"] = function () {};
   ```

## 类

TS是面向对象的JavaScript,类描述了所创建对象的属性和方法.

### 创建一个类

包括属性,构造函数和方法这几个部分.

```typescript
// 类名首字母大写
class 类名 {
    属性1: string;
   	属性2: number;
    // 构造函数,实例化时被自动调用
    constructor(参数1:string) {
        this.字段1 = 参数1;
    }
    // 方法
    方法1(): string {
        return this.字段1;
    }
}
```

###  创建实例及访问

使用`new`创建实例,使用"."运算符进行属性的访问.

### 装饰器

**定义：**装饰器是一个特殊类型的声明，能够被附加到类声明，类方法和属性或方法参数上。

装饰器使用```@expression```这种形式来表示。```@expression```求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息作为参数传入。

若有一个装饰器```@table```则需要顶一个`table`函数。

```typescript
// 类装饰器
@log
class Hello {
  greeting:string;
  constructor(message: string) {
    console.log("构造函数执行");
    this.greeting = message;
  }
  greet() {
    console.log("Hello, " + this.greeting);
  }
}

// 参数为构造函数
function log(constructor:Function) {
  console.log("=======start=======");
  console.log("call constructor : " + constructor.prototype.constructor.name);
  console.log("========end========");
}
let hello = new Hello("zzxiongfan");
hello.greet();
// 输出
> =======start=======
> call constructor : Hello
> ========end========
> 构造函数执行
> Hello, zzxiongfan
```

从上面的输出的结果可以看出，装饰器优先于构造函数执行，没有交叉执行。

```typescript
// 方法装饰器与属性装饰器
// import "reflect-metadata"
class Hello2 {
  @logType
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  @writable(false)
  greet() {
    console.log("Hello, " + this.greeting);
  }
}
function writable(flag: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("=======start=======");
    console.log(propertyKey);
    console.log(target);
    console.log(descriptor);
    descriptor.writable = flag;
    console.log("========end========");
  }
}
function logType(target: any, key: string) {
  // var t = Reflect.getMetadata("design:type", target, key);
  console.log(`${key} type:`);
}
let hello2 = new Hello2("zzxiongfan");
hello2.greet();
hello2.greeting;
// 输出
> greeting type:
> =======start=======
> greet
> Hello2 { greet: [Function] }
> {
>   value: [Function],
>   writable: true,
>   enumerable: true,
>   configurable: true
> }
> ========end========
> Hello, zzxiongfan
```

**装饰器只在加载代码的时候执行一次**

**问题：**

1. 装饰器是一个表达式，表达式求值后必须为一个函数，如何理解？

   > 直接函数表达式，或者执行后返回一个函数也可以。

2. 装饰器传入的第一个参数:"target"，静态成员和实例成员的理解？

   > 字面意思，如果是类，则为这个类的构造函数
   >
   > 如果为方法或者属性，为其原型（所在类的原型对象）

### 类成员的可见性

public，protected（自身及子类可见），private（私有，只能被自身访问，不能被继承）

## 接口

**定义：**一系列抽象属性或方法的声明，**只给出属性和方法的约定，不给出具体实现。**

Typescript的核心原则之一就是对值所具有的结构进行检查，接口的作用就是为这列类型命名或定义契约。

### 声明与使用

#### 声明

- interface作为关键字

- 分号分隔

  ```typescript
  interface 接口名 {
      // 属性或者方法定义
  }
  // example
  interface IPeople {
      // 不同于对象，这个地方使用；进行分割
      name: string;
      // ? 限定  表示参数可选
      age?: number;
      walk();
      eat(a: string);
  }
  ```

  **一般用I开头，后续按照类的命名原则**

#### 使用

- 简单使用

  ```typescript
  interface IConfigs {
      name: string;
      height?: number;
      widtf?: number;
      learn?();
  }
  function load(config: IConfigs) {
      console.log(config);
  }
  load({name: "div", height: 180})
  ```

  **做类型的时候，传参用对象**

- 接口继承类使用

  ```typescript
  class React {
      heigh: number = 100;
      width: number = 200;
      learn?() {
          console.log("learning");
      }
  }
  interface ICondig extends React {
      name: string;
  }
  function load(config: IConfig) {
      console.log(config);
      config.learn();  // 会报错，没有learn方法
  }
  ```

  继承属性的定义，**可选属性不继承。**

- 类继承接口（`implements`关键字）

  ```typescript
  // 多接口继承
  // 接口定义
  interface IConfigs {
      height: number;
      width: number;
  }
  interface IBasw {
      id: string;
      name: string;
      toString():string;
  }
  // 继承
  class MyElement implements IConfig, IBase {
      hetght: number = 200;
      width: number = 300;
      id: string = "";
      name: string = "myele";
      toString() {
          return JSON.stringify(this);
      }
  }
  ```

  