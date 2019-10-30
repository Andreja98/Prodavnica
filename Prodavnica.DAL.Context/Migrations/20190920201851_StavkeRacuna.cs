using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Prodavnica.DAL.Context.Migrations
{
    public partial class StavkeRacuna : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StavkeRacuna",
                columns: table => new
                {
                    StavkaRacunaId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Cena = table.Column<double>(nullable: false),
                    Kolicina = table.Column<int>(nullable: false),
                    NazivMaterijala = table.Column<string>(nullable: true),
                    VrstaMaterijalaId = table.Column<int>(nullable: false),
                    SifraRacuna = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StavkeRacuna", x => x.StavkaRacunaId);
                    table.ForeignKey(
                        name: "FK_StavkeRacuna_Racuni_SifraRacuna",
                        column: x => x.SifraRacuna,
                        principalTable: "Racuni",
                        principalColumn: "sifraRacuna",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StavkeRacuna_VrsteMaterijala_VrstaMaterijalaId",
                        column: x => x.VrstaMaterijalaId,
                        principalTable: "VrsteMaterijala",
                        principalColumn: "VrstaMaterijalaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StavkeRacuna_SifraRacuna",
                table: "StavkeRacuna",
                column: "SifraRacuna");

            migrationBuilder.CreateIndex(
                name: "IX_StavkeRacuna_VrstaMaterijalaId",
                table: "StavkeRacuna",
                column: "VrstaMaterijalaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StavkeRacuna");
        }
    }
}
