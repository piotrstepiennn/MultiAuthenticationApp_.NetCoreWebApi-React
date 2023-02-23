using MobileApp.ViewModel;

namespace MobileApp;

public partial class MainPage : ContentPage
{

	public MainPage(LoginViewModel viewModel)
	{
		InitializeComponent();
		BindingContext = viewModel;
	}

}

