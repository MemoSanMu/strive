type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';
// 接口实现1
interface Request {
  (url: string, method: MethodType): Promise<any>;
  GET: number;
  POST: number;
  PUT: number;
  DELETE: number;
}

// 正常调用
const request: Request = function (url: string, method: MethodType) {
  return new Promise<any>(() => {});
};

request('4', 'GET');

request.GET = 1;
request.POST = 2;
request.PUT = 3;
request.DELETE = 4;
