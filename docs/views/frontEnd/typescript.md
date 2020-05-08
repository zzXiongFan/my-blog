---
title: '《TypeScript实战》学习笔记'
date: 2020-05-08
tags:
 - typescript
categories: 
 - 前端相关
---

> 主要标记TS中与JS不同的部分

## TypeScript基本语法

### 认识TS的简单语法

#### 声明变量

```typescript
// let 或 var  变量名: 数据类型 = 初始化值
// 例子
let varName: string = "hello world";
```

**问题：如果不声明类型会如何？**

### 类型

#### 基础类型

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

#### 任意值：any

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

#### 空值、Null和Undefined

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

#### Never

never类型表示从不会出现的值，一般用于函数抛出异常Error或存在无法正常结束的情况。

#### Symbols

JS在ES6中加入的语法，表示独一无二的值，**一旦创建就不能变更，且不能设置属性**，一般是用作对象的一个属性。

#### 交叉类型

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

#### Union类型