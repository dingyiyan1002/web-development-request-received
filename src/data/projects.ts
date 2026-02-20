// 项目教学数据 - 复杂项目拆分成小片段学习

export interface ProjectFragment {
  id: number;
  title: string;
  code: string;
  explanation: string;
  keyPoints: string[];
  interviewTips: string[];
  visualizationType: 'flow' | 'memory' | 'architecture' | 'output' | 'none';
  practiceQuestions: {
    question: string;
    answer: string;
  }[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  difficulty: 'intermediate' | 'advanced' | 'expert';
  totalLines: number;
  tags: string[];
  fragments: ProjectFragment[];
}

export const projects: Project[] = [
  {
    id: 'http-server',
    name: '嵌入式HTTP服务器 + 日志系统',
    description: '一个支持多线程并发、环形日志缓冲区的轻量级HTTP服务器，适合嵌入式Linux应用开发学习',
    difficulty: 'advanced',
    totalLines: 280,
    tags: ['网络编程', '多线程', '文件IO', '日志系统', 'socket'],
    fragments: [
      {
        id: 1,
        title: '项目概述与架构设计',
        code: `/* 项目：嵌入式HTTP服务器 + 日志系统
 * 功能：
 *   1. 支持HTTP/1.0 GET请求
 *   2. 多线程并发处理客户端
 *   3. 环形缓冲区异步日志
 *   4. 信号处理优雅退出
 * 
 * 架构图：
 * 
 *    ┌─────────────┐
 *    │   主线程     │
 *    │  监听端口    │
 *    └──────┬──────┘
 *           │ accept()
 *           ▼
 *    ┌─────────────┐     ┌─────────────┐
 *    │  工作线程池  │────▶│  HTTP处理   │
 *    │  (pthread)  │     │  解析/响应  │
 *    └─────────────┘     └──────┬──────┘
 *                               │
 *                               ▼
 *                        ┌─────────────┐
 *                        │  日志系统    │
 *                        │ 环形缓冲区   │
 *                        └─────────────┘
 */

#define SERVER_PORT 8080
#define MAX_CLIENTS 10
#define BUFFER_SIZE 4096
#define LOG_BUFFER_SIZE (64 * 1024)  // 64KB日志缓冲区

// 日志级别
typedef enum {
    LOG_DEBUG,
    LOG_INFO,
    LOG_WARN,
    LOG_ERROR
} LogLevel;`,
        explanation: '本片段介绍项目整体架构。主线程负责监听端口，每来一个连接就创建一个工作线程处理。日志系统使用环形缓冲区实现异步写入，避免阻塞主流程。',
        keyPoints: [
          '主线程负责监听和accept',
          '工作线程池处理并发连接',
          '环形缓冲区实现异步日志',
          '信号处理实现优雅退出'
        ],
        interviewTips: [
          '为什么需要多线程？单线程有什么问题？',
          '线程池相比每次创建线程的优势？',
          '异步日志有什么好处？'
        ],
        visualizationType: 'architecture',
        practiceQuestions: [
          {
            question: '如果不用多线程，还有什么方案可以实现并发处理？',
            answer: '可以使用IO多路复用（select/poll/epoll）单线程处理多个连接，或者使用多进程（fork）方案。'
          },
          {
            question: '环形缓冲区满了怎么办？',
            answer: '可以选择覆盖旧数据（丢日志）或阻塞等待。本实现选择覆盖，因为日志通常允许丢失，但不能阻塞业务。'
          }
        ]
      },
      {
        id: 2,
        title: 'Socket创建与服务器初始化',
        code: `#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <fcntl.h>

// 创建监听socket
int create_server_socket(int port) {
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd < 0) {
        perror("socket creation failed");
        return -1;
    }
    
    // 设置SO_REUSEADDR，允许快速重启
    int opt = 1;
    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, 
                   &opt, sizeof(opt)) < 0) {
        perror("setsockopt failed");
        close(server_fd);
        return -1;
    }
    
    // 绑定地址
    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_port = htons(port),
        .sin_addr.s_addr = INADDR_ANY
    };
    
    if (bind(server_fd, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        perror("bind failed");
        close(server_fd);
        return -1;
    }
    
    // 开始监听
    if (listen(server_fd, MAX_CLIENTS) < 0) {
        perror("listen failed");
        close(server_fd);
        return -1;
    }
    
    return server_fd;
}`,
        explanation: 'socket()创建TCP套接字，AF_INET表示IPv4，SOCK_STREAM表示TCP。SO_REUSEADDR允许端口快速重用，避免"Address already in use"错误。bind()绑定端口，listen()开始监听。',
        keyPoints: [
          'socket(AF_INET, SOCK_STREAM, 0) 创建TCP socket',
          'SO_REUSEADDR 允许端口快速重用',
          'htons() 主机字节序转网络字节序（大端）',
          'INADDR_ANY 监听所有网卡地址'
        ],
        interviewTips: [
          'SO_REUSEADDR的作用是什么？',
          'TCP和UDP的socket创建有什么区别？',
          'bind()失败可能是什么原因？'
        ],
        visualizationType: 'flow',
        practiceQuestions: [
          {
            question: '为什么需要htons()转换端口？',
            answer: 'x86是小端字节序，网络协议是大端。htons()确保端口在不同架构的计算机间正确传输。'
          },
          {
            question: 'listen的backlog参数是什么意思？',
            answer: 'backlog是连接队列的最大长度。当队列满时，新连接会被拒绝（客户端收到ECONNREFUSED）。'
          }
        ]
      },
      {
        id: 3,
        title: '多线程并发处理',
        code: `#include <pthread.h>

// 客户端处理参数
typedef struct {
    int client_fd;
    struct sockaddr_in client_addr;
} ClientArgs;

// 工作线程函数
void* client_handler(void* arg) {
    ClientArgs* args = (ClientArgs*)arg;
    int fd = args->client_fd;
    
    // 设置线程分离，结束时自动回收资源
    pthread_detach(pthread_self());
    
    log_message(LOG_INFO, "New connection from %s:%d",
                inet_ntoa(args->client_addr.sin_addr),
                ntohs(args->client_addr.sin_port));
    
    // 处理HTTP请求
    handle_http_request(fd);
    
    close(fd);
    free(args);
    return NULL;
}

// 主循环接受连接
void server_loop(int server_fd) {
    while (server_running) {
        struct sockaddr_in client_addr;
        socklen_t addr_len = sizeof(client_addr);
        
        int client_fd = accept(server_fd, 
                               (struct sockaddr*)&client_addr, 
                               &addr_len);
        if (client_fd < 0) {
            if (errno == EINTR) continue;  // 被信号中断
            perror("accept failed");
            continue;
        }
        
        // 创建线程处理客户端
        ClientArgs* args = malloc(sizeof(ClientArgs));
        args->client_fd = client_fd;
        args->client_addr = client_addr;
        
        pthread_t tid;
        if (pthread_create(&tid, NULL, client_handler, args) != 0) {
            log_message(LOG_ERROR, "Failed to create thread");
            close(client_fd);
            free(args);
        }
    }
}`,
        explanation: '每个客户端连接创建一个pthread处理。pthread_detach()让线程结束时自动释放资源，无需pthread_join()。accept()阻塞等待连接，被信号中断时返回EINTR需要重试。',
        keyPoints: [
          'pthread_create() 创建线程',
          'pthread_detach() 分离线程，自动回收',
          'accept() 阻塞等待客户端连接',
          'EINTR 信号中断需要重试'
        ],
        interviewTips: [
          '线程分离(detach)和等待(join)的区别？',
          '如何处理accept被信号中断？',
          '线程太多会有什么后果？如何限制？'
        ],
        visualizationType: 'flow',
        practiceQuestions: [
          {
            question: '如果不detach，会有什么后果？',
            answer: '线程资源不会被回收，导致内存泄漏。僵尸线程会累积，最终耗尽系统资源。'
          },
          {
            question: '如何限制并发线程数？',
            answer: '可以使用线程池，或者维护一个计数器，超过限制时在accept前sleep或拒绝连接。'
          }
        ]
      },
      {
        id: 4,
        title: 'HTTP请求解析',
        code: `// HTTP请求结构
typedef struct {
    char method[16];
    char path[256];
    char version[16];
    int keep_alive;
} HttpRequest;

// 解析HTTP请求行
int parse_request_line(const char* buf, HttpRequest* req) {
    // 格式: GET /path HTTP/1.1\r\n
    if (sscanf(buf, "%15s %255s %15s", 
               req->method, req->path, req->version) != 3) {
        return -1;
    }
    
    // 只支持GET方法
    if (strcmp(req->method, "GET") != 0) {
        return -1;
    }
    
    // 检查是否保持连接
    req->keep_alive = (strstr(buf, "Connection: keep-alive") != NULL);
    
    return 0;
}

// 处理HTTP请求
void handle_http_request(int client_fd) {
    char buffer[BUFFER_SIZE];
    HttpRequest req = {0};
    
    // 读取请求（简化版，假设一次能读完）
    ssize_t n = recv(client_fd, buffer, sizeof(buffer) - 1, 0);
    if (n <= 0) return;
    buffer[n] = '\\0';
    
    log_message(LOG_DEBUG, "Received request:\\n%s", buffer);
    
    // 解析请求
    if (parse_request_line(buffer, &req) < 0) {
        send_error_response(client_fd, 400, "Bad Request");
        return;
    }
    
    log_message(LOG_INFO, "%s %s", req.method, req.path);
    
    // 处理路径
    if (strcmp(req.path, "/") == 0) {
        strcpy(req.path, "/index.html");
    }
    
    // 发送文件
    send_file_response(client_fd, req.path, req.keep_alive);
}`,
        explanation: 'HTTP请求解析使用sscanf提取方法、路径、版本。只实现GET方法简化处理。strstr查找Connection头判断是否保持连接。recv读取请求数据，注意可能一次读不完（生产环境需要循环读取）。',
        keyPoints: [
          'HTTP请求格式：方法 路径 版本',
          'sscanf解析请求行',
          'recv读取客户端数据',
          'Connection头控制连接保持'
        ],
        interviewTips: [
          'HTTP/1.0和HTTP/1.1的区别？',
          '如果请求太大，一次recv读不完怎么办？',
          '如何防止缓冲区溢出攻击？'
        ],
        visualizationType: 'flow',
        practiceQuestions: [
          {
            question: '为什么只支持GET方法？',
            answer: 'POST需要处理请求体(body)，涉及Content-Length解析和表单数据处理，复杂度较高。作为示例项目，GET足够展示核心逻辑。'
          },
          {
            question: '如何正确处理大请求？',
            answer: '需要循环recv直到读到\\r\\n\\r\\n（请求头结束标志），同时限制最大请求大小防止攻击。'
          }
        ]
      },
      {
        id: 5,
        title: 'HTTP响应与文件发送',
        code: `// MIME类型映射
typedef struct {
    const char* ext;
    const char* type;
} MimeType;

static const MimeType mime_types[] = {
    {".html", "text/html"},
    {".css", "text/css"},
    {".js", "application/javascript"},
    {".png", "image/png"},
    {".jpg", "image/jpeg"},
    {".gif", "image/gif"},
    {NULL, "application/octet-stream"}
};

const char* get_mime_type(const char* path) {
    const char* ext = strrchr(path, '.');
    if (!ext) return "text/plain";
    
    for (int i = 0; mime_types[i].ext; i++) {
        if (strcmp(ext, mime_types[i].ext) == 0) {
            return mime_types[i].type;
        }
    }
    return "application/octet-stream";
}

// 发送文件响应
void send_file_response(int fd, const char* path, int keep_alive) {
    char full_path[512];
    snprintf(full_path, sizeof(full_path), "./www%s", path);
    
    // 安全检查：防止目录遍历攻击
    if (strstr(full_path, "..")) {
        send_error_response(fd, 403, "Forbidden");
        return;
    }
    
    int file_fd = open(full_path, O_RDONLY);
    if (file_fd < 0) {
        send_error_response(fd, 404, "Not Found");
        return;
    }
    
    // 获取文件大小
    struct stat st;
    fstat(file_fd, &st);
    
    // 发送响应头
    char header[512];
    snprintf(header, sizeof(header),
             "HTTP/1.1 200 OK\\r\\n"
             "Content-Type: %s\\r\\n"
             "Content-Length: %ld\\r\\n"
             "Connection: %s\\r\\n"
             "\\r\\n",
             get_mime_type(path),
             st.st_size,
             keep_alive ? "keep-alive" : "close");
    
    send(fd, header, strlen(header), 0);
    
    // 发送文件内容（零拷贝）
    sendfile(fd, file_fd, NULL, st.st_size);
    
    close(file_fd);
}`,
        explanation: 'sendfile()实现零拷贝文件发送，数据直接从内核文件缓存发送到网卡，不经过用户空间。检查".."防止目录遍历攻击。根据文件扩展名设置Content-Type。',
        keyPoints: [
          'sendfile() 零拷贝发送文件',
          '目录遍历攻击防护',
          'MIME类型映射',
          'Connection头控制连接'
        ],
        interviewTips: [
          'sendfile相比read+send的优势？',
          '什么是目录遍历攻击？如何防范？',
          '零拷贝的原理是什么？'
        ],
        visualizationType: 'flow',
        practiceQuestions: [
          {
            question: '为什么sendfile叫"零拷贝"？',
            answer: '传统方式：磁盘→内核缓冲区→用户缓冲区→socket缓冲区→网卡。sendfile：磁盘→内核缓冲区→网卡，跳过了用户空间拷贝。'
          },
          {
            question: '除了..，还需要防范什么攻击？',
            answer: '路径长度攻击（超长路径）、空字节注入（%00）、特殊字符（~、/等）。生产环境应使用白名单验证。'
          }
        ]
      },
      {
        id: 6,
        title: '环形缓冲区日志系统',
        code: `// 环形缓冲区日志系统
typedef struct {
    char buffer[LOG_BUFFER_SIZE];
    volatile size_t head;  // 写入位置
    volatile size_t tail;  // 读取位置
    pthread_mutex_t mutex;
    pthread_cond_t cond;
    int flush_fd;          // 日志文件fd
} LogBuffer;

static LogBuffer g_log = {0};

// 初始化日志系统
void log_init(const char* filename) {
    g_log.flush_fd = open(filename, 
                          O_WRONLY | O_CREAT | O_APPEND, 0644);
    pthread_mutex_init(&g_log.mutex, NULL);
    pthread_cond_init(&g_log.cond, NULL);
    
    // 创建刷盘线程
    pthread_t tid;
    pthread_create(&tid, NULL, log_flush_thread, NULL);
    pthread_detach(tid);
}

// 写入日志到环形缓冲区
void log_message(LogLevel level, const char* fmt, ...) {
    const char* level_str[] = {"DEBUG", "INFO", "WARN", "ERROR"};
    
    // 格式化消息
    char msg[1024];
    time_t now = time(NULL);
    struct tm* tm_info = localtime(&now);
    
    int prefix = snprintf(msg, sizeof(msg), 
                          "[%04d-%02d-%02d %02d:%02d:%02d][%s] ",
                          tm_info->tm_year + 1900, tm_info->tm_mon + 1,
                          tm_info->tm_mday, tm_info->tm_hour,
                          tm_info->tm_min, tm_info->tm_sec,
                          level_str[level]);
    
    va_list args;
    va_start(args, fmt);
    vsnprintf(msg + prefix, sizeof(msg) - prefix, fmt, args);
    va_end(args);
    
    strcat(msg, "\\n");
    
    // 写入环形缓冲区
    size_t len = strlen(msg);
    pthread_mutex_lock(&g_log.mutex);
    
    for (size_t i = 0; i < len; i++) {
        g_log.buffer[g_log.head] = msg[i];
        g_log.head = (g_log.head + 1) % LOG_BUFFER_SIZE;
        // 如果缓冲区满，覆盖旧数据
        if (g_log.head == g_log.tail) {
            g_log.tail = (g_log.tail + 1) % LOG_BUFFER_SIZE;
        }
    }
    
    pthread_cond_signal(&g_log.cond);
    pthread_mutex_unlock(&g_log.mutex);
}`,
        explanation: '环形缓冲区使用head/tail指针，模运算实现环形。写日志时先格式化（加时间戳、级别），然后写入缓冲区。如果缓冲区满，覆盖旧数据（丢日志）。单独的刷盘线程异步写入文件。',
        keyPoints: [
          'head/tail指针实现环形缓冲区',
          '模运算实现环形：(pos + 1) % size',
          'volatile确保多线程可见性',
          '异步刷盘避免阻塞业务'
        ],
        interviewTips: [
          '环形缓冲区满了怎么办？',
          'volatile在这里的作用？',
          '为什么需要单独的刷盘线程？'
        ],
        visualizationType: 'memory',
        practiceQuestions: [
          {
            question: 'head == tail表示空还是满？',
            answer: '本实现中head==tail表示空。为了区分空和满，可以：①留一个空位不存 ②增加count字段记录数量 ③使用标志位。'
          },
          {
            question: '如何做到不丢日志？',
            answer: '可以改为阻塞写入（缓冲区满时等待），或者动态扩容，或者批量写入磁盘。但阻塞会影响业务，需要权衡。'
          }
        ]
      },
      {
        id: 7,
        title: '日志刷盘线程与信号处理',
        code: `// 日志刷盘线程
void* log_flush_thread(void* arg) {
    char write_buf[LOG_BUFFER_SIZE];
    
    while (server_running) {
        pthread_mutex_lock(&g_log.mutex);
        
        // 等待数据或超时
        struct timespec ts;
        clock_gettime(CLOCK_REALTIME, &ts);
        ts.tv_sec += 1;  // 1秒超时
        pthread_cond_timedwait(&g_log.cond, &g_log.mutex, &ts);
        
        // 复制数据到本地缓冲区
        size_t to_write = 0;
        if (g_log.head >= g_log.tail) {
            to_write = g_log.head - g_log.tail;
            memcpy(write_buf, g_log.buffer + g_log.tail, to_write);
        } else {
            // 环形缓冲区回绕，分两段复制
            size_t first = LOG_BUFFER_SIZE - g_log.tail;
            memcpy(write_buf, g_log.buffer + g_log.tail, first);
            memcpy(write_buf + first, g_log.buffer, g_log.head);
            to_write = first + g_log.head;
        }
        g_log.tail = g_log.head;
        
        pthread_mutex_unlock(&g_log.mutex);
        
        // 写入文件（持有锁外，减少锁竞争）
        if (to_write > 0) {
            write(g_log.flush_fd, write_buf, to_write);
        }
    }
    
    return NULL;
}

// 信号处理：优雅退出
volatile sig_atomic_t server_running = 1;

void signal_handler(int sig) {
    server_running = 0;
    log_message(LOG_INFO, "Received signal %d, shutting down...", sig);
}

// 主函数
int main() {
    // 设置信号处理
    signal(SIGINT, signal_handler);
    signal(SIGTERM, signal_handler);
    
    // 忽略SIGPIPE（客户端断开时write不崩溃）
    signal(SIGPIPE, SIG_IGN);
    
    // 初始化日志
    log_init("server.log");
    log_message(LOG_INFO, "Server starting on port %d", SERVER_PORT);
    
    // 创建服务器socket
    int server_fd = create_server_socket(SERVER_PORT);
    if (server_fd < 0) {
        return 1;
    }
    
    // 进入服务循环
    server_loop(server_fd);
    
    // 清理
    close(server_fd);
    close(g_log.flush_fd);
    log_message(LOG_INFO, "Server stopped");
    
    return 0;
}`,
        explanation: '刷盘线程使用pthread_cond_timedwait等待数据，1秒超时确保及时刷盘。信号处理设置server_running标志，主循环检测到后退出。SIGPIPE忽略防止客户端断开导致程序崩溃。',
        keyPoints: [
          '条件变量实现生产者-消费者',
          'pthread_cond_timedwait超时等待',
          'sig_atomic_t保证信号安全',
          'SIGPIPE忽略防止崩溃'
        ],
        interviewTips: [
          '为什么write要在锁外进行？',
          'sig_atomic_t的作用？',
          '如何确保所有日志都刷盘？'
        ],
        visualizationType: 'flow',
        practiceQuestions: [
          {
            question: '为什么用sig_atomic_t而不是int？',
            answer: 'sig_atomic_t保证读写是原子的，不会被信号中断。普通int可能在读写过程中被信号打断，导致读到中间状态。'
          },
          {
            question: '如何确保退出时日志不丢失？',
            answer: '退出前可以调用fsync()强制刷盘，或者设置标志让刷盘线程退出前写完所有数据。'
          }
        ]
      },
      {
        id: 8,
        title: '完整代码与性能优化',
        code: `/* 完整代码整合 + 优化建议
 * 
 * 编译：gcc -o http_server http_server.c -lpthread -O2
 * 运行：./http_server
 * 测试：curl http://localhost:8080/
 * 
 * ===== 性能优化建议 =====
 * 
 * 1. 线程池替代动态创建线程
 *    - 避免频繁创建/销毁线程的开销
 *    - 控制并发数，防止资源耗尽
 * 
 * 2. 使用epoll替代多线程（Linux）
 *    - 单线程处理大量连接
 *    - 减少上下文切换开销
 * 
 * 3. 内存池管理请求缓冲区
 *    - 避免频繁malloc/free
 *    - 减少内存碎片
 * 
 * 4. 日志批量写入
 *    - 积累一定量再write
 *    - 减少系统调用次数
 * 
 * 5. 使用sendfile零拷贝
 *    - 已在本实现中使用
 *    - 适合大文件传输
 * 
 * 6. 启用TCP_CORK或TCP_NODELAY
 *    - 控制数据包合并
 *    - 减少网络小包
 * 
 * ===== 安全加固建议 =====
 * 
 * 1. 限制单IP连接数
 * 2. 请求大小限制
 * 3. 更严格的请求验证
 * 4. 使用chroot隔离文件系统
 * 5. 以非root用户运行
 * 
 * ===== 完整代码文件列表 =====
 * 
 * http_server.c    - 主程序
 * ├── socket创建与初始化
 * ├── 多线程并发处理
 * ├── HTTP请求解析
 * ├── 文件响应发送
 * ├── 环形缓冲区日志
 * └── 信号处理
 */

// 线程池版本简化示意
typedef struct {
    pthread_t* threads;
    int thread_count;
    int queue_size;
    // ... 任务队列
} ThreadPool;

ThreadPool* thread_pool_create(int num_threads);
void thread_pool_submit(ThreadPool* pool, void (*func)(void*), void* arg);
void thread_pool_destroy(ThreadPool* pool);

// 使用线程池后，accept后直接提交任务：
// thread_pool_submit(pool, (void*)client_handler, args);`,
        explanation: '本片段总结项目并提供优化建议。线程池可以复用线程，避免频繁创建销毁。epoll是Linux高性能网络编程首选。内存池减少碎片。安全方面需要限制资源使用，防止DDoS攻击。',
        keyPoints: [
          '线程池复用线程资源',
          'epoll适合高并发场景',
          '批量写入减少系统调用',
          '安全加固防止攻击'
        ],
        interviewTips: [
          '线程池的核心参数如何设置？',
          'epoll相比select的优势？',
          '如何防御慢速攻击（Slowloris）？'
        ],
        visualizationType: 'architecture',
        practiceQuestions: [
          {
            question: '线程池大小应该如何设置？',
            answer: 'CPU密集型：线程数≈CPU核心数。IO密集型：线程数可以更多，通常2*CPU核心数或根据延迟计算。'
          },
          {
            question: '什么是C10K问题？',
            answer: 'C10K指同时处理10000个连接的问题。传统多线程方案资源消耗大，解决方案：IO多路复用(epoll/kqueue)、事件驱动、协程。'
          }
        ]
      }
    ]
  }
];

// 获取项目列表
export function getAllProjects(): Project[] {
  return projects;
}

// 根据ID获取项目
export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}
