import java.util.Arrays;
import java.util.Scanner;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;

public class DataKaryawan {

    public static void main(String[] args) {
        // deklarasi variabel
        String nama, alamat, jabatan;
        int gaji, usia;

        // Buat array yang berisi status pernikahan
        String[] list = new String[]{"Sudah Menikah","Belum Menikah"};

        // membuat scanner baru
        Scanner keyboard = new Scanner(System.in);

        // Tampilkan output ke user
        System.out.println("### Pendataan Karyawan PT. Angin Ribut");
        System.out.print("Nama karyawan: ");
        // menggunakan scanner dan menyimpan apa yang diketik di variabel nama
        nama = keyboard.nextLine();
        // Tampilkan output lagi
        System.out.print("Alamat: ");
        alamat = keyboard.nextLine();

        System.out.print("Usia: ");
        usia = keyboard.nextInt();

        System.out.print("Gaji: ");
        gaji = keyboard.nextInt();
        
        int tunangan = 0;
        while(true) {
            System.out.println(Arrays.toString(list));
            System.out.print("Status (Jawab dengan angka): ");
            int status = keyboard.nextInt();
            if(status == 1) {
                tunangan = gaji + 1000000;
                break;
            } else if(status == 2) {
                tunangan = gaji;
                break;
            } else {
                System.out.println("Jangan melebihi jumlah pilihan yang ada!");
            }
        }
        
        // Perkondisian untuk menentukan posisi jabatan berdasarkan gajinya
        if(gaji <= 1000000) {
            jabatan = "Staff";
        } else {
            jabatan = "Direktur";
        }

        // Tutup Scanner
        keyboard.close();
        
        // Rupiah
        DecimalFormat rupiah = (DecimalFormat) DecimalFormat.getCurrencyInstance();
        DecimalFormatSymbols formatRp = new DecimalFormatSymbols();

        formatRp.setCurrencySymbol("Rp. ");
        formatRp.setMonetaryDecimalSeparator(',');
        formatRp.setGroupingSeparator('.');

        rupiah.setDecimalFormatSymbols(formatRp);

        // Menampilkan apa yang sudah simpan di variabel
        System.out.println("---------------------");
        System.out.println("Nama Karyawan: " + nama);
        System.out.println("Alamat: " + alamat);
        System.out.println("Usia: " + usia + " tahun");
        System.out.printf("Gaji: %s %n", rupiah.format(tunangan));
        System.out.println("jabatan: " + jabatan);
    }
}