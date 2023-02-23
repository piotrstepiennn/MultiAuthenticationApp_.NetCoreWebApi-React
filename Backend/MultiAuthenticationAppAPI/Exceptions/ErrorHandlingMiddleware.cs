﻿namespace MultiAuthenticationAppAPI.Exceptions
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        public ErrorHandlingMiddleware()
        {

        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch(MultiAuthenticationAppAPI.Exceptions.NotFoundException notFoundException)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(notFoundException.Message);
            }
            catch(BadRequestException badRequestException)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(badRequestException.Message);
            }
            catch(Exception ex)
            {
                context.Response.StatusCode=500;
                await context.Response.WriteAsync("Something Went Wrong!");
            }
        }
    }
}
