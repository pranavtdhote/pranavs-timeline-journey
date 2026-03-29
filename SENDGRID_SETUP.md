# SendGrid Email Integration Setup

This project now includes SendGrid email integration for the contact form. Here's how to set it up:

## Prerequisites

1. **SendGrid Account**: Sign up at [sendgrid.com](https://sendgrid.com)
2. **API Key**: Create an API key in your SendGrid dashboard

## Setup Instructions

### 1. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your SendGrid credentials:
   ```
   SENDGRID_API_KEY=your_actual_sendgrid_api_key_here
   FROM_EMAIL=pranavtdhote@gmail.com
   TO_EMAIL=pranavtdhote@gmail.com
   PORT=3001
   NODE_ENV=development
   ```

### 2. SendGrid Configuration

1. **Verify Sender Email**: In SendGrid dashboard, verify your sender email address
2. **Set up Domain Authentication** (recommended for production)
3. **Configure Reply-To**: The system automatically sets the sender's email as reply-to

### 3. Running the Application

#### Development Mode (Frontend + Backend)
```bash
npm run dev:full
```
This runs both the React frontend (port 8080) and Express backend (port 3001)

#### Individual Services
```bash
# Frontend only
npm run dev

# Backend only
npm run server:dev
```

### 4. Testing the Integration

1. Start the application: `npm run dev:full`
2. Navigate to the contact form
3. Fill out and submit the form
4. Check your email for the message
5. Reply to the email - it will go directly to the sender

## Features

- ✅ **Email Delivery**: Contact form submissions are sent via SendGrid
- ✅ **Reply-To Functionality**: Recipients can reply directly to the sender
- ✅ **Form Validation**: Client and server-side validation
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **Loading States**: Visual feedback during form submission
- ✅ **HTML Email**: Rich HTML email formatting

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

## Troubleshooting

### Common Issues

1. **"Failed to send message"**
   - Check your SendGrid API key
   - Verify sender email is authenticated
   - Check server logs for detailed errors

2. **CORS Errors**
   - Ensure backend is running on port 3001
   - Check that frontend is making requests to correct URL

3. **Email Not Received**
   - Check spam folder
   - Verify SendGrid account status
   - Check SendGrid activity logs

### SendGrid Dashboard

Monitor your email delivery in the SendGrid dashboard:
- Activity feed shows sent emails
- Suppression lists for bounced emails
- Statistics and analytics

## Production Deployment

For production deployment:

1. **Environment Variables**: Set production environment variables
2. **Domain Authentication**: Configure SendGrid domain authentication
3. **Rate Limiting**: Consider adding rate limiting to prevent spam
4. **HTTPS**: Ensure all communications use HTTPS
5. **Error Monitoring**: Set up error monitoring and logging

## Security Considerations

- API keys are stored in environment variables
- Input validation prevents injection attacks
- CORS is configured for security
- Rate limiting recommended for production

