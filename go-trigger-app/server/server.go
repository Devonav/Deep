// server/server.go
package main

import (
	"database/sql"
	"go-trigger-app/db"
	"go-trigger-app/storage"
	"go-trigger-app/web"
	"log"
	"os"

	"github.com/joho/godotenv" // <-- Import godotenv
	_ "github.com/lib/pq"
)

func main() {
	// Load .env file. It will not override variables that are already set.
	// This means on the server, the .profile variables will be used.
	// On your Mac, this will load your local .env file.
	godotenv.Load() // <-- Add this line

	d, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer d.Close()

	storage.InitS3()

	cors := os.Getenv("profile") == "prod"
	app := web.NewApp(db.NewDB(d), cors)
	err = app.Serve()
	log.Println("Error", err)
}
