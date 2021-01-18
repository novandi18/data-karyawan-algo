// Deklarasikan variabel
let data = [];
let btnSubmit = document.getElementById('submit');
let form = document.getElementById('formData');
let modal = document.getElementById("myModal");
let modalData = document.getElementById("modalData");
let span = document.getElementsByClassName("close")[0];
let span2 = document.getElementsByClassName("closeData")[0];
let btnView = document.getElementById("viewAllData");
let txtData = document.getElementById("dataAll");
let namaData = document.getElementById("namaData");
let btnDel = document.getElementsByClassName("btnDel");
let dataUI = document.getElementById("dataUI");
dataUI.style.display = "none";
let closeData = document.getElementById("closeData");
let dataK = document.getElementById("dataK");
let noData = document.getElementById("noData");
let gajiInp = document.getElementById('gaji');

// Jika input gaji diketik, maka jalanan fungsi formatRupiah()
gajiInp.addEventListener("keyup", function(e) {
    gajiInp.value = formatRupiah(this.value);
});

// Fungsi formatRupiah
function formatRupiah(angka, prefix){
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split = number_string.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);
 
	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if(ribuan){
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}
 
	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return prefix == undefined ? rupiah : (rupiah ? + rupiah : '');
}

// Jalankan fungsi tableData()
tableData();

// Jika tombol submit pada form diklik, jalan fungsi getData()
form.addEventListener("submit", function getData() {
    // Tangkap value dari tiap inputan
    namaVal = document.getElementById('nama').value;
    alamatVal = document.getElementById('alamat').value;
    usiaVal = document.getElementById('usia').value;
    gajiVal = document.getElementById('gaji').value;
    
    // Pindahkan semua value inputan ke dalam array $data
    data.push({
        nama: namaVal,
        alamat: alamatVal,
        usia: usiaVal + " tahun",
        gaji: "Rp. " + gajiVal,
    });

    // Console log isi array $data untuk ngecek apakah udah masuk atau belum 
    console.table(data);

    // Dapatkan index element yang baru saja ditambahkan
    let endKey = [data.length - 1];
    let keyNama = data[endKey].nama;
    let keyAlamat = data[endKey].alamat;
    let keyUsia = data[endKey].usia;
    let keyGaji = data[endKey].gaji;

    // Tampilkan modal
    modal.style.display = "block";
    // Reset seluruh inputan pada form
    form.reset();

    // Masukkan data terbaru yang ditambahkan dari form ke dalam modal
    document.getElementById('namaHasil').innerHTML = keyNama;
    document.getElementById('alamatHasil').innerHTML = keyAlamat;
    document.getElementById('usiaHasil').innerHTML = keyUsia;
    document.getElementById('gajiHasil').innerHTML = keyGaji;

    // Kirim array ke Local Storage
    localStorage.setItem('data', JSON.stringify(data));

    // Hapus elemen tabel pada #dataAll
    $("#dataAll table").remove();

    // Jalankan fungsi tableData()
    tableData();
});

// Function helper multiple setAttribute
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

// Perulangan array of objects (Diambil dari LocalStorage) ke dalam tabel
function tableData() {
    // Buat variabel yang memiliki 4 item dalam array (Jumlah item dan penamaan item harus persis dengan nama key yang ada dalam array $data (Lihat di line 60 diatas))
    let headers = ['Nama', 'Alamat', 'Usia', 'Gaji'];
    
    // Tangkap key pada LocalStorage lalu taruh kedalam variabel $dataObj
    let dataObj = localStorage.getItem('data');
    console.log(dataObj);
    // Parsing data yang berbentuk string pada variabel $dataObj menjadi bentuk JSON (Object)
    let parseObj = JSON.parse(dataObj);
    let img = document.createElement("img");
    let empty = document.createElement("span");
    img.src = 'img/404.png';
    empty.textContent = "Tidak ada data";
    setAttributes(img, {"width":"80%"});

    // Jika tidak ada localStorage, tampilkan tulisan "No data" pada bagan #dataAll
    if(!parseObj) {
        document.getElementById("dataAll").appendChild(img);
        document.getElementById("dataAll").appendChild(empty);
        $(".btnDel").css({"display":"none"});
        $(".title").css({"position":"relative","width":"auto"});
    } else {
        $(".title").css({"position":"fixed","width":"350px"});
        $(".btnDel").css({"display":"block"});
        // Jika ada localStorage, hilangkan tulisan "No data"
        document.getElementById("dataAll").innerHTML = "";
        // Buat variabel $table untuk membuat elemen <table>
        let table = document.createElement('table');
        // Buat variabel $headerRow untuk membuat elemen <tr>
        let headerRow = document.createElement('tr');
        
        headers.forEach(headerText => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
        });
        
        table.appendChild(headerRow);
        
        parseObj.forEach(d => {
            let row = document.createElement('tr');
            
            Object.values(d).forEach(text => {
                let cell = document.createElement('td');
                let textNode = document.createTextNode(text);
                cell.appendChild(textNode);
                row.appendChild(cell);
            });
        
            table.appendChild(row);
        });
        
        setAttributes(txtData.appendChild(table), {"border":"1", "cellpadding":"2", "cellspacing":"0"});
    }

}

// Jika tombol $modalData diklik, akan memunculkan modal $modalData
btnView.addEventListener("click", function() {
    dataUI.style.display = "block";
    document.querySelector(".box").style.width = "700px";
    $(".box .container:first-child").css({"width":"300px", "padding-right":"0"});
    btnView.hidden = true;
});

// Jika tombol close pada bagan $dataUI diklik, maka akan menutup/menyembunyikan bagan $dataUI
closeData.addEventListener("click", function() {
    dataUI.style.display = "none";
    btnView.hidden = false;
    $(".box .container:first-child").css({"width":"100%", "padding-right":"25px"});
    $(".box").css({"width":"350px"});
});

// Modal $modal akan terclose apabila tombol $span diklik
span.onclick = function() {
    modal.style.display = "none";
}

// Function untuk menghapus LocalStorage
function deleteData() {
    window.localStorage.clear();
    data = [];
    $("#dataAll table").remove();
    tableData();
};