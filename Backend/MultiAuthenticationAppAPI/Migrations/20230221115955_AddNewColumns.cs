using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MultiAuthenticationAppAPI.Migrations
{
    public partial class AddNewColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Authcode",
                table: "Users",
                newName: "AuthPassword");

            migrationBuilder.AddColumn<string>(
                name: "EmailAuthcode",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MobileAppAuthcode",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailAuthcode",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MobileAppAuthcode",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "AuthPassword",
                table: "Users",
                newName: "Authcode");
        }
    }
}
