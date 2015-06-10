self.port.on('SBM-fetchWindowSize', function() {
    self.port.emit("windowSize", {height: window.innerHeight, width: window.innerWidth});
});