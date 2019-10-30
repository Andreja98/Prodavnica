using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Prodavnica.DAL.Context.Migrations
{
    public partial class VrsteMaterijala : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VrsteMaterijala",
                columns: table => new
                {
                    VrstaMaterijalaId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SifraMaterijala = table.Column<string>(nullable: true),
                    Naziv = table.Column<string>(nullable: true),
                    Cena = table.Column<double>(nullable: false),
                    Kolicina = table.Column<int>(nullable: false),
                    Dobavljac = table.Column<string>(nullable: true),
                    MaterijalId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VrsteMaterijala", x => x.VrstaMaterijalaId);
                    table.ForeignKey(
                        name: "FK_VrsteMaterijala_Materijali_MaterijalId",
                        column: x => x.MaterijalId,
                        principalTable: "Materijali",
                        principalColumn: "MaterijalId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VrsteMaterijala_MaterijalId",
                table: "VrsteMaterijala",
                column: "MaterijalId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VrsteMaterijala");
        }
    }
}
