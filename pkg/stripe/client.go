package stripe

import (
	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/client"
)

type Client struct {
	SC *client.API
}

func NewClient(apiKey string) *Client {
	return &Client{
		SC: client.New(apiKey, nil),
	}
}
