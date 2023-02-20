using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Evertec_Backend.Models;

public partial class EvertecCTX : DbContext
{
    public EvertecCTX()
    {
    }

    public EvertecCTX(DbContextOptions<EvertecCTX> options)
        : base(options)
    {
    }

    public virtual DbSet<DataInfo> DataInfos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=Evertec;Trusted_Connection=True;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=False;Connection Timeout=30;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DataInfo>(entity =>
        {
            entity.ToTable("DataInfo");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BirthDay).HasColumnType("date");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UserPhoto).IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
