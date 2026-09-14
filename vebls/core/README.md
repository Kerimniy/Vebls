## Backend structure
```
.
├── cmd
│   └── app
│       └── main.go
├── go.mod
├── go.sum
├── internal
│   ├── config
│   │   └── config.go
│   ├── database
│   │   └── db.go
│   ├── models
│   │   ├── files-struct.go
│   │   ├── rules-struct.go
│   │   └── user_struct.go
│   ├── services
│   │   ├── auth.go
│   │   ├── confirm_code.go
│   │   ├── crypt.go
│   │   ├── dirlist.go
│   │   ├── disk_usage.go
│   │   ├── mail.go
│   │   ├── manage_files.go
│   │   ├── rules.go
│   │   └── search.go
│   └── transport
│       └── handlers.go
└── pkg
    └── tgbot
        └── telegram-bot.go
  ```