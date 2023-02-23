using MobileApp.View;

namespace MobileApp;

public partial class AppShell : Shell
{
	public AppShell()
	{
        Routing.RegisterRoute("//CodePage", typeof(CodePage));
        InitializeComponent();
	}
}
