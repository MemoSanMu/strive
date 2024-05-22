// props的类型
export default class Props {
  // public children:
  //   | Array<React.ReactElement<any>>
  //   | React.ReactElement<any>
  //   | never[] = [];
  public speed: number = 500;
  public height: number = 160;
  public animation: string = 'easeInOutQuad';
  public isAuto: boolean = true;
  public autoPlayInterval: number = 4500;
  public afterChange: () => {};
  public beforeChange: () => {};
  public selesctedColor: string;
  public showDots: boolean = true;
}

// props 使用场景

// Props 类型约束
// 1 export default class Carousel extends React.Component<Props> {}
// 初始化默认值
// 2 const defaultProps = new Props()

// 通过2中使用ts 的 class 既可以用作类型约束，同时也可以作为初始化默认值使用。一举两得

// 修饰符
// 可以看到，上述的形式跟ES6十分的相似，typescript在此基础上添加了三种修饰符：

// 公共 public：可以自由的访问类程序里定义的成员
// 私有 private：只能够在该类的内部进行访问
// 受保护 protect：除了在该类的内部可以访问，还可以在子类中仍然可以访问

// 静态属性 static 只能通过类来访问，不能通过实例来访问
// 静态方法 static 只能通过类来访问，不能通过实例来访问

// 抽象类 abstract 用于定义抽象类和其中的抽象方法
