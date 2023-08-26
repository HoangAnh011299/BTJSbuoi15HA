
// hàm rút gọn 
function getMyEle(ele){
    return document.getElementById(ele)
}

// hàm bọc ngoài là hàm xử lý validation khi nhập thiếu input
(function () {
    'use strict';

    const forms = document.querySelectorAll('.requires-validation');

    Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Lấy số kw điện
            const tongThuNhap = parseFloat(document.getElementById("tongThuNhap").value);
            const soNguoiPhuThuoc = parseFloat(document.getElementById("soNguoiPhuThuoc").value);
            const isValid = form.checkValidity();
            
            if (!isValid) {
                Swal.fire({
                    icon: 'error',
                    title: 'Vui lòng nhập đủ thông tin!',
                  })               
                form.classList.add('was-validated');
                return;
            }

            var thuNhapChiuThue; // Biến tính thu nhập chịu thuế 
            var tienThue ; // Biến tính tiền thuế

            // tính thu nhập chịu thuế
            thuNhapChiuThue= tongThuNhap - 4 - soNguoiPhuThuoc * 1.6;
            
            //so sánh với bảng thu nhập chịu thuế và tính tiền thuế theo % thuế suất
            if(thuNhapChiuThue <=60) {
                tienThue=thuNhapChiuThue*0.05;
            } else if(thuNhapChiuThue > 60 || thuNhapChiuThue <=120) {
                tienThue=thuNhapChiuThue*0.1;
            } else if(thuNhapChiuThue > 120 || thuNhapChiuThue <=210) {
                tienThue=thuNhapChiuThue*0.15;
            } else if(thuNhapChiuThue > 210 || thuNhapChiuThue <=384) {
                tienThue=thuNhapChiuThue*0.2;
            } else if(thuNhapChiuThue > 384 || thuNhapChiuThue <=624) {
                tienThue=thuNhapChiuThue*0.25;
            } else if(thuNhapChiuThue > 624 || thuNhapChiuThue <=960) {
                tienThue=thuNhapChiuThue*0.3;
            } else{
                tienThue=thuNhapChiuThue*0.35;
            } 
            // Thông báo tổng tiền điện sử dụng SweetAlert
            Swal.fire({
                title: `Tiền thuế là: ${tienThue } triệu`,
            });

            // Xóa lớp was-validated
            form.classList.remove('was-validated');
    
            // Xóa dữ liệu trong các trường input
            form.reset();
        }, false);
    });    
})();
