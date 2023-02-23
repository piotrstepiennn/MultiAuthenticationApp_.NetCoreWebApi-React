using Android.App;
using MobileApp.Services;
using MobileApp.ViewModel;

namespace MobileApp;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
				fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
			});
		//builder.Services.AddHttpClient();
        builder.Services.AddSingleton<LoginService>();
        builder.Services.AddSingleton<LoginViewModel>();

		//builder.Services.AddSingleton<CodeViewModel>();

		builder.Services.AddSingleton<MainPage>();

		return builder.Build();
	}
}
