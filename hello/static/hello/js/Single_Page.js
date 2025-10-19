// Single_Page.js - 单页面应用交互逻辑
class SinglePageApp {
    constructor() {
        this.currentTab = 'page1';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.init();
    }

    init() {
        console.log('单页面应用初始化 - 田彬彬 20231201022');
        this.setupTabSwitching();
        this.setupConsoleCommands();
        this.updateStatusBar('系统就绪');
    }

    setupTabSwitching() {
        const tabs = document.querySelectorAll('.tab');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchToTab(tab.getAttribute('data-tab'));
            });
        });
    }

    switchToTab(tabId) {
        // 移除所有活跃状态
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // 激活选中的标签页
        const selectedTab = document.querySelector(`.tab[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(tabId);
        
        if (selectedTab && selectedContent) {
            selectedTab.classList.add('active');
            selectedContent.classList.add('active');
            this.currentTab = tabId;
            
            this.addConsoleLog(`切换到标签页: ${selectedTab.textContent}`, 'info');
            this.updateStatusBar(`当前页面: ${selectedTab.textContent}`);
        }
    }

    setupConsoleCommands() {
        const commandInput = document.getElementById('commandInput');
        
        commandInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(commandInput.value);
                commandInput.value = '';
            }
        });

        commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            }
        });
    }

    executeCommand(command) {
        if (!command.trim()) return;

        // 添加到历史记录
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;

        // 显示命令
        this.addConsoleLog(`> ${command}`, 'info');
        
        // 处理命令
        const response = this.processCommand(command);
        this.addConsoleLog(response, 'success');
    }

    processCommand(command) {
        const cmd = command.trim().toLowerCase();
        
        const commands = {
            'help': '可用命令: help, clear, time, student, version, switch [page]',
            'clear': () => this.clearConsole(),
            'time': `当前时间: ${new Date().toLocaleString('zh-CN')}`,
            'student': '学生: 田彬彬 (20231201022) - Django Web开发',
            'version': 'Django 4.2.8 | Python 3.13 | 单页面应用 v1.0',
            'status': '系统状态: 正常运行 | 内存使用: 45MB | 请求数: 128'
        };

        if (commands[cmd]) {
            if (typeof commands[cmd] === 'function') {
                return commands[cmd]();
            }
            return commands[cmd];
        } else if (cmd.startsWith('switch ')) {
            const page = cmd.replace('switch ', '');
            this.switchToTab(page);
            return `切换到 ${page}`;
        } else {
            return `未知命令: ${command}。输入 "help" 查看可用命令`;
        }
    }

    addConsoleLog(message, type = 'info') {
        const consoleLogs = document.getElementById('consoleLogs');
        const time = new Date().toLocaleString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        }).replace(',', '');

        const logEntry = document.createElement('div');
        logEntry.className = `log-entry log-${type}`;
        logEntry.innerHTML = `
            <span class="log-time">${time}</span>
            <span class="log-message">${message}</span>
        `;

        consoleLogs.appendChild(logEntry);
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
    }

    clearConsole() {
        const consoleLogs = document.getElementById('consoleLogs');
        consoleLogs.innerHTML = '';
        return '控制台已清空';
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        this.historyIndex += direction;
        
        if (this.historyIndex < 0) this.historyIndex = 0;
        if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length;
            document.getElementById('commandInput').value = '';
            return;
        }

        document.getElementById('commandInput').value = this.commandHistory[this.historyIndex];
    }

    updateStatusBar(message) {
        const statusBar = document.getElementById('statusBar');
        statusBar.textContent = message;
    }

    // 模拟服务器日志
    simulateServerLogs() {
        const logs = [
            { delay: 1000, message: '正在加载单页面应用...', type: 'info' },
            { delay: 2000, message: 'Django 服务器运行正常', type: 'success' },
            { delay: 3000, message: '数据库连接已建立', type: 'success' },
            { delay: 4000, message: '静态文件服务已启动', type: 'info' }
        ];

        logs.forEach(log => {
            setTimeout(() => {
                this.addConsoleLog(log.message, log.type);
            }, log.delay);
        });
    }
}

// 全局函数
function showSkillInfo(skill) {
    const details = {
        'Python': '熟练掌握 Django 框架开发',
        'Django': '全栈 Web 开发框架',
        'HTML/CSS': '网页结构和样式设计',
        'JavaScript': '前端交互和动态效果'
    };
    
    alert(`技能: ${skill}\n描述: ${details[skill] || '暂无详细描述'}`);
}

function executeCommand() {
    const commandInput = document.getElementById('commandInput');
    if (window.singlePageApp) {
        window.singlePageApp.executeCommand(commandInput.value);
    }
    commandInput.value = '';
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    window.singlePageApp = new SinglePageApp();
    
    // 自动模拟服务器日志
    setTimeout(() => {
        window.singlePageApp.simulateServerLogs();
    }, 1000);
});

console.log('Single_Page.js 加载完成');