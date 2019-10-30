﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Prodavnica.DAL.Context;

namespace Prodavnica.DAL.Context.Migrations
{
    [DbContext(typeof(ProdavnicaContext))]
    partial class ProdavnicaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Prodavnica.Common.Models.Korisnik", b =>
                {
                    b.Property<int>("KorisnikId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DatumRodjenja");

                    b.Property<string>("Ime");

                    b.Property<string>("JMBG");

                    b.Property<string>("KorisnickoIme");

                    b.Property<string>("Lozinka");

                    b.Property<string>("Mail");

                    b.Property<double>("Plata");

                    b.Property<string>("Pol");

                    b.Property<string>("Prezime");

                    b.Property<int>("RolaId");

                    b.HasKey("KorisnikId");

                    b.HasIndex("RolaId");

                    b.ToTable("Korisnici");
                });

            modelBuilder.Entity("Prodavnica.Common.Models.Materijal", b =>
                {
                    b.Property<int>("MaterijalId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv");

                    b.HasKey("MaterijalId");

                    b.ToTable("Materijali");
                });

            modelBuilder.Entity("Prodavnica.Common.Models.Racun", b =>
                {
                    b.Property<int>("sifraRacuna")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("datumIVremeIzdavanja");

                    b.Property<double>("ukupanIznos");

                    b.HasKey("sifraRacuna");

                    b.ToTable("Racuni");
                });

            modelBuilder.Entity("Prodavnica.Common.Models.Rola", b =>
                {
                    b.Property<int>("RolaId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv");

                    b.HasKey("RolaId");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("Prodavnica.Common.Models.StavkaRacuna", b =>
                {
                    b.Property<int>("StavkaRacunaId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Cena");

                    b.Property<int>("Kolicina");

                    b.Property<string>("NazivMaterijala");

                    b.Property<int>("SifraRacuna");

                    b.Property<int>("VrstaMaterijalaId");

                    b.HasKey("StavkaRacunaId");

                    b.HasIndex("SifraRacuna");

                    b.HasIndex("VrstaMaterijalaId");

                    b.ToTable("StavkeRacuna");
                });

            modelBuilder.Entity("Prodavnica.Common.Models.VrstaMaterijala", b =>
                {
                    b.Property<int>("VrstaMaterijalaId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Cena");

                    b.Property<string>("Dobavljac");

                    b.Property<int>("Kolicina");

                    b.Property<int>("MaterijalId");

                    b.Property<string>("Naziv");

                    b.Property<string>("SifraMaterijala");

                    b.HasKey("VrstaMaterijalaId");

                    b.HasIndex("MaterijalId");

                    b.ToTable("VrsteMaterijala");
                });

            modelBuilder.Entity("Prodavnica.Common.Models.Korisnik", b =>
                {
                    b.HasOne("Prodavnica.Common.Models.Rola", "Rola")
                        .WithMany()
                        .HasForeignKey("RolaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Prodavnica.Common.Models.StavkaRacuna", b =>
                {
                    b.HasOne("Prodavnica.Common.Models.Racun", "Racun")
                        .WithMany()
                        .HasForeignKey("SifraRacuna")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Prodavnica.Common.Models.VrstaMaterijala", "VrstaMaterijala")
                        .WithMany()
                        .HasForeignKey("VrstaMaterijalaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Prodavnica.Common.Models.VrstaMaterijala", b =>
                {
                    b.HasOne("Prodavnica.Common.Models.Materijal", "Materijal")
                        .WithMany()
                        .HasForeignKey("MaterijalId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
