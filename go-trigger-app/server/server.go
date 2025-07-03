// server.go
package main

import (
	"database/sql"
	"go-trigger-app/db"      // Your existing db package
	"go-trigger-app/storage" // <-- Import the new storage package
	"go-trigger-app/web"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func main() {
	// Use the DATABASE_URL environment variable directly
	d, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer d.Close()

	// Initialize Wasabi Session
	storage.InitS3() // <-- Add this line

	// CORS is enabled only in prod profile
	cors := os.Getenv("profile") == "prod"
	app := web.NewApp(db.NewDB(d), cors)
	err = app.Serve()
	log.Println("Error", err)
}

// You can now DELETE the entire dataSource() function.
