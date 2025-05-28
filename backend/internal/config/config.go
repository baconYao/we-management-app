package config

import (
	"fmt"
	"os"
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	// Database Configuration
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string

	// Server Configuration
	ServerPort string
	ServerMode string

	// Logging Configuration
	LogLevel  string
	LogFormat string

	// CORS Configuration
	CORSAllowedOrigins []string

	// Rate Limiting
	RateLimitRequests int
	RateLimitDuration time.Duration

	// JWT Configuration
	JWTSecret     string
	JWTExpiration time.Duration
}

func LoadConfig() (*Config, error) {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	viper.AddConfigPath("./config")
	viper.AutomaticEnv()

	// Set default values
	viper.SetDefault("DB_HOST", "localhost")
	viper.SetDefault("DB_PORT", "5432")
	viper.SetDefault("DB_USER", "postgres")
	viper.SetDefault("DB_NAME", "we_management")
	viper.SetDefault("SERVER_PORT", "8080")
	viper.SetDefault("SERVER_MODE", "debug")
	viper.SetDefault("LOG_LEVEL", "debug")
	viper.SetDefault("LOG_FORMAT", "json")
	viper.SetDefault("RATE_LIMIT_REQUESTS", 100)
	viper.SetDefault("RATE_LIMIT_DURATION", 60)
	viper.SetDefault("JWT_EXPIRATION", 24)

	// Read config file
	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return nil, fmt.Errorf("error reading config file: %w", err)
		}
	}

	config := &Config{
		// Database Configuration
		DBHost:     viper.GetString("DB_HOST"),
		DBPort:     viper.GetString("DB_PORT"),
		DBUser:     viper.GetString("DB_USER"),
		DBPassword: viper.GetString("DB_PASSWORD"),
		DBName:     viper.GetString("DB_NAME"),

		// Server Configuration
		ServerPort: viper.GetString("SERVER_PORT"),
		ServerMode: viper.GetString("SERVER_MODE"),

		// Logging Configuration
		LogLevel:  viper.GetString("LOG_LEVEL"),
		LogFormat: viper.GetString("LOG_FORMAT"),

		// CORS Configuration
		CORSAllowedOrigins: viper.GetStringSlice("CORS_ALLOWED_ORIGINS"),

		// Rate Limiting
		RateLimitRequests: viper.GetInt("RATE_LIMIT_REQUESTS"),
		RateLimitDuration: time.Duration(viper.GetInt("RATE_LIMIT_DURATION")) * time.Second,

		// JWT Configuration
		JWTSecret:     viper.GetString("JWT_SECRET"),
		JWTExpiration: time.Duration(viper.GetInt("JWT_EXPIRATION")) * time.Hour,
	}

	// Validate required fields
	if config.DBPassword == "" {
		config.DBPassword = os.Getenv("DB_PASSWORD")
	}
	if config.JWTSecret == "" {
		config.JWTSecret = os.Getenv("JWT_SECRET")
	}

	return config, nil
}
