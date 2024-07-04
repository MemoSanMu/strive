// 在 globals.d.ts 文件中
declare type GlobalString = string;  // 全局属性
 // [全局接口]
declare interface GlobalInterface {
    name: string
}
// 然后在任何文件中，你可以直接使用 GlobalString 和 GlobalInterface
let myString: GlobalString;
let myObject: GlobalInterface;


// 在 custom.d.ts 文件中
// [window全局属性]
declare interface Window {
    customProperty: string
}
// 现在，Window 类型将包含一个名为 customProperty 的新属性
// window.customProperty = "someValue";


 // 在一个脚本文件或 .d.ts 文件中
// [ 模块空间 ]
declare module MyApp {
    export type GlobalType = {
        name: string
    }
}
// 使用全局命名空间中的类型
let item: MyApp.GlobalType;


// 在一个 .d.ts 文件中
// [命名空间]
namespace declare MyGlobalModule {
    export type SomeGlobalType = {
        name: string    
    }
}
// 你可以在任何地方通过导入来使用这个类型
import { SomeGlobalType } from MyGlobalModule;


// a.ts
namespace Shape {
    export interface Person{
        name:string
        age:number
    }
}