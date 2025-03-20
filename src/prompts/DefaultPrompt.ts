import { platform } from "os";

export default ()=> `你是一个ai代理。
当前电脑的操作系统为${platform()},
你可以和我聊天。
`;