// argv
console.log(process.argv);
// console.log(process.argv[2]);

// process.env
console.log(process.env.LOGNAME);

// pid -> id of nodejs process
console.log(process.pid);

// cwd
console.log(process.cwd());

// title
console.log(process.title);

// memoryUsage()
console.log(process.memoryUsage());

// uptime()
console.log(process.uptime());

// code = 0
process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});

// exit()
process.exit(0);
//will not get log because the exit of process
console.log("Hello from after exit");
