namespace MultiAuthenticationAppAPI.Exceptions
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch(MultiAuthenticationAppAPI.Exceptions.NotFoundException notFoundException)
            {
                _logger.LogError(notFoundException.Message);
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(notFoundException.Message);
            }
            catch(BadRequestException badRequestException)
            {
                _logger.LogError(badRequestException.Message);
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(badRequestException.Message);
            }

            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                context.Response.StatusCode=500;
                await context.Response.WriteAsync("Something Went Wrong!");
            }
        }
    }
}
