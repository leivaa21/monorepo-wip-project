import { IncomingMessage } from "http";

class HttpRequest extends IncomingMessage {
  public body: {} = {}

  static async getReqBody(req: IncomingMessage): Promise<{}> {
    return new Promise((resolve, reject) => {
      try {
        let bodyAsString: string = ''
        let body = {}
        req.on("data", (chunk) => {
          bodyAsString += chunk.toString();
        })
        req.on("end", () => {
          body = JSON.parse(bodyAsString || '{}');
          resolve(body);
        })
      } catch (error) {
        reject(error);
      }
    });
    
  }
}

export default HttpRequest;
