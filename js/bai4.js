// Lấy các thẻ input liên quan
const nhaDanInput = document.getElementById("nhaDan");
const doanhNghiepInput = document.getElementById("doanhNghiep");
const soKetNoiInput = document.getElementById("soKetNoi");

// Gán sự kiện onclick cho input "Nhà dân"
nhaDanInput.addEventListener("click", function() {
    // Ẩn ô input "Số kết nối"
    soKetNoiInput.style.display = "none";
    // Xóa giá trị trong ô input "Số kết nối"
    soKetNoiInput.value = "";
});

// Gán sự kiện onclick cho input "Doanh nghiệp"
doanhNghiepInput.addEventListener("click", function() {
    // Hiện ô input "Số kết nối"
    soKetNoiInput.style.display = "block";
    // Để có thể nhập vào ô input "Số kết nối", hãy xóa thuộc tính "disabled"
    soKetNoiInput.removeAttribute("disabled");
});


// hàm rút gọn 
function getMyEle(ele){
    return document.getElementById(ele)
}


// tạo biến và gán giá trị cho các loại phí, biến tổng phí dịch vụ và tiền cáp
var phiXLHDND =4.5, phiXLHDDV =15, phiDVCBND =20.5, phiDVCBDN =75, phiKenhCCND = 7.5 ,  phiKenhCCDN = 50, tongPhiDV ,tienCap 

// lấy loại khách hàng
function layLoaiKH(){
    var kq;
    var nhaDan = getMyEle('nhaDan').checked ;
    var doanhNghiep = getMyEle('doanhNghiep').checked ;

    if(nhaDan) {
        kq = "nhandan";
    } else if(doanhNghiep) {
        kq = "doanhnghiep";
    }
    return kq;
}

(function () {
    'use strict';

    const forms = document.querySelectorAll('.requires-validation');

    const soKetNoiInput = document.getElementById("soKetNoi");

    nhaDanInput.addEventListener("click", function() {
        // Disable ô input "Số kết nối"
        soKetNoiInput.disabled = true;
        // Xóa giá trị trong ô input "Số kết nối"
        soKetNoiInput.value = "";
    });

    doanhNghiepInput.addEventListener("click", function() {
        // Enable ô input "Số kết nối"
        soKetNoiInput.disabled = false;
    });

    Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
            
            // lấy số kênh cao cấp và số kết nối khi là doanh nghiệp
            const soKenhCC = parseFloat(document.getElementById("soKenhCC").value);
            const soKetNoi = parseFloat(document.getElementById("soKetNoi").value);
            
            const isValid = form.checkValidity();
    
            if (!isValid) {
                Swal.fire({
                    icon: 'error',
                    title: 'Vui lòng nhập đủ thông tin!',
                  })
                form.classList.add('was-validated');
                return;
            }

            var loaikhachhang = layLoaiKH();
            switch (loaikhachhang) {
                case("nhandan"):
                tienCap = phiXLHDND + phiDVCBND + soKenhCC * phiKenhCCND
                Swal.fire({
                    title: `Tiền cáp là: ${tienCap } $`,
                });
                break;
                case("doanhnghiep"):
                    if(soKetNoi <= 10 ) {
                        tongPhiDV = phiDVCBDN
                        tienCap = phiXLHDDV + tongPhiDV + soKenhCC * phiKenhCCDN  
                        console.log("tienCap:", tienCap)
                        Swal.fire({
                            title: `Tiền cáp là: ${tienCap } $`,
                        });
                    } else {
                        tongPhiDV = phiDVCBDN * (soKetNoi-10)
                        tienCap = phiXLHDDV + tongPhiDV + soKenhCC * phiKenhCCDN  
                        console.log("tienCap:", tienCap)
                        Swal.fire({
                            title: `Tiền cáp là: ${tienCap } $`,
                        });
                    }
                break;
            }
  
            // Xóa lớp was-validated
            form.classList.remove('was-validated');
    
            // Xóa dữ liệu trong các trường input
            form.reset();
        }, false);
    });    
})();
