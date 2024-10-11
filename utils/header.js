const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1cGVrcHppZXV3dXdsaXh4dXl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzODY5NDgsImV4cCI6MjA0Mzk2Mjk0OH0.KYNWGwK5w8jyv5B0dW66mMI-wyrMfktfmWEjB5R-nR8"

export const defaultHeader = {
  "apikey": apikey,
  "Authorization": `Bearer ${apikey}`,
  "Content-Type": "application/json"
}