// server/storage/wasabi.go
package storage

import (
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

var S3Session *s3.S3

func InitS3() {
	region := os.Getenv("WASABI_REGION")
	if region == "" {
		fmt.Println("WASABI_REGION environment variable not set.")
		return
	}
	s3Endpoint := fmt.Sprintf("s3.%s.wasabisys.com", region)

	creds := credentials.NewStaticCredentials(
		os.Getenv("WASABI_ACCESS_KEY"),
		os.Getenv("WASABI_SECRET_KEY"),
		"",
	)

	sess, err := session.NewSession(&aws.Config{
		Region:           aws.String(region),
		Credentials:      creds,
		Endpoint:         aws.String(s3Endpoint),
		S3ForcePathStyle: aws.Bool(true), // Important for Wasabi
	})
	if err != nil {
		fmt.Printf("Failed to create S3 session: %s\n", err)
		return
	}

	S3Session = s3.New(sess)
	fmt.Println("Wasabi S3 session initialized")
}
