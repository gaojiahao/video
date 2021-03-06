module.exports = {
  devEnv: {
    NODE_ENV: "development", // 本地环境
    hosturl: "http://124.71.6.26:8080",
    loginUrl: "http://124.71.6.26:8080/#/me",
    wsBaseUrl: "ws://124.71.6.26:8090/ws?UserId="

    // 老测试
    // hosturl: "http://139.9.71.135:8080",
    // loginUrl: "http://139.9.71.135:8080/#/me",
    // wsBaseUrl: "ws://139.9.71.135:8090/ws?UserId="

    // hosturl: "https://www.toysbear.com",
    // loginUrl: "https://www.toysbear.com/#/me",
    // wsBaseUrl: "wss://impush.toysbear.com/ws?UserId="
  },
  testEnv: {
    NODE_ENV: "test", // 测试环境
    hosturl: "http://124.71.6.26:8080",
    loginUrl: "http://124.71.6.26:8080/#/me",
    wsBaseUrl: "ws://124.71.6.26:8090/ws?UserId="
    // hosturl: "https://www.toysbear.com",
    // loginUrl: "https://www.toysbear.com/#/me",
    // wsBaseUrl: "wss://impush.toysbear.com/ws?UserId="
  },
  proEnv: {
    NODE_ENV: "production",
    // 测试环境
    // hosturl: "http://139.9.71.135:8080",
    // loginUrl: "http://139.9.71.135:8080/#/me",
    // wsBaseUrl: "ws://139.9.71.135:8090/ws?UserId="
    // 新测试环境
    hosturl: "http://124.71.6.26:8080",
    loginUrl: "http://124.71.6.26:8080/#/me",
    wsBaseUrl: "ws://124.71.6.26:8090/ws?UserId="
    // 生产环境
    // hosturl: "http://1.14.158.14:8081",

    // hosturl: "https://www.toysbear.com",
    // loginUrl: "https://www.toysbear.com/#/me",
    // wsBaseUrl: "wss://impush.toysbear.com/ws?UserId="
  }
};
