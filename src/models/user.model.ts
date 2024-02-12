import { IncomingMessage, ServerResponse } from "http";
import { Stream } from "stream";

export interface UserModel {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface AppContext {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>
  users: UserModel[],
  path: string,
  method: string,
  body: Buffer | string | Stream,
  status: number,
}
