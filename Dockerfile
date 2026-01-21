# Build Stage
FROM golang:1.23-alpine AS builder
WORKDIR /app
# Copy only go.mod initially if go.sum is empty/missing, or both if present. 
# Allow failure on go.sum if not present? No, COPY fails. 
# We assume go.sum exists (created empty).
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/api

# Run Stage
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
