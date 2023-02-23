using MobileApp.ViewModel;

namespace MobileApp.View;

public partial class CodePage : ContentPage
{
	public CodePage(LoginViewModel viewModel)
	{
		InitializeComponent();
		BindingContext= viewModel;
	}
}