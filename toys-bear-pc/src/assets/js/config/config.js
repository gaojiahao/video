module.exports = {
  devEnv: {
    NODE_ENV: "development", // 本地环境
    hosturl: "http://139.9.71.135:8081",
    // hosturl: "https://api.toysbear.com",
    // hosturl: "http://139.9.71.135:8096",
    wsBaseUrl: "ws://139.9.71.135:8090/ws?UserId="
  },
  testEnv: {
    NODE_ENV: "test", // 测试环境
    hosturl: "http://139.9.71.135:8081",
    wsBaseUrl: "ws://139.9.71.135:8090/ws?UserId="
  },
  proEnv: {
    NODE_ENV: "production", // 生产环境
    // hosturl: "http://139.9.71.135:8081",
    hosturl: "https://www.toysbear.com",
    // wsBaseUrl: "ws://139.9.71.135:8090/ws?UserId="
    wsBaseUrl: "wss://impush.toysbear.com/ws?UserId="
  }
};
