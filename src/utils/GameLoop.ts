class GameLoop {
    maxFPS: number;
    delta: number;
    lastFrameTimeMs: number;
    timestep: number;
    beforeUpdateHooks: Array<(d: number) => void>;
    updateHooks: Array<(d: number) => void>;
    hookNames: number[];
    afterUpdateHooks: Array<(d: number) => void>;
    isWindowActive: boolean;
    inactiveFF: boolean;
    lastWindowActiveTimestamp: number;


    constructor() {
        this.maxFPS = 60;
        this.delta = 0;
        this.lastFrameTimeMs = 0;
        this.timestep = 1000/this.maxFPS;
        this.beforeUpdateHooks = [];
        this.updateHooks = [];
        this.hookNames = [];
        this.afterUpdateHooks = [];
        this.isWindowActive = true;
        this.inactiveFF = false;
        this.lastWindowActiveTimestamp = (new Date()).getTime();
    } 

    startLoop() {
        requestAnimationFrame((t: number) => this.loop(this, t));
    }

    inactiveTime() {
        return  (new Date()).getTime() - this.lastWindowActiveTimestamp;
    }

    stop() {
        this.isWindowActive = false;
        this.inactiveFF = true;
        this.lastWindowActiveTimestamp = (new Date()).getTime();
    }

    start() {
        this.isWindowActive = true;
        this.inactiveFF = false;
        this.doUpdate(this.inactiveTime());
        this.startLoop();
    }

    loop(self: GameLoop, timestamp : number) {
        if (this.isWindowActive) {
            if (timestamp < self.lastFrameTimeMs + (1000 / self.maxFPS)) {
                requestAnimationFrame((t: number) => self.loop(self, t));
                return;
            }
            
            self.delta += timestamp - self.lastFrameTimeMs;
            self.lastFrameTimeMs = timestamp;
            while(self.delta >= self.timestep) {
                let numUpdateSteps = 0;
                self.doUpdate(self.timestep);
                self.delta -= self.timestep;
                if (++numUpdateSteps >= 240) {
                    self.panic();
                    break;
                }
            }

            requestAnimationFrame((t: number) => self.loop(self, t));
        } else {

        }
        
    }

    doUpdate(delta: number) {
        this.beforeUpdate(delta);
        this.update(delta);
        this.afterUpdate(delta);
    }

    update(delta: number) {
        //update logic
        for (const hook of this.updateHooks) {
            hook(delta);
        }
    }

    beforeUpdate(delta: number) {

    }

    afterUpdate(delta: number) {

    }

    panic() {
        this.delta = 0;
        console.log('PANIC PANIC PANIC PANIC')
    }

    removeUpdateHook(hookId: number) {
        const idx = this.hookNames.indexOf(hookId);
        console.log(idx);
        if (idx === -1) return false;
        this.hookNames = this.hookNames.filter((_, id) => id !== idx);
        this.updateHooks = this.updateHooks.filter((_, id) => id !== idx);
        return true;
    } 

    addUpdateHook(hook : (d: number) => void) {
        const id = this.updateHooks.length;
        this.hookNames.push(id);
        this.updateHooks.push(hook);
        return id;
    }
}

export default GameLoop;
