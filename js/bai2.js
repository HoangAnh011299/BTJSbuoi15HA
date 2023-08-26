
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
            const soKW = parseFloat(document.getElementById("soKW").value);
            console.log("soKW:", soKW)
            const isValid = form.checkValidity();
            
            if (!isValid) {
                Swal.fire({
                    icon: 'error',
                    title: 'Vui lòng nhập đủ thông tin!',
                  })
                form.classList.add('was-validated');
                return;
            }
            // Biến tổng tiền điện theo số kww
            var tongTienDien;

            if(soKW <= 50) {
                tongTienDien = soKW * 500; 
            } else if(soKW > 50 && soKW <= 100) {
                tongTienDien = (soKW * 500) + (soKW-50)*650;
            } else if(soKW > 100 && soKW <= 200) {
                tongTienDien = (50 * 500) + (50*650) + (soKW-100)*850;
            } else if(soKW > 200 && soKW <= 350) {
                tongTienDien = (50 * 500) + (50*650) + (100*850) +(soKW-200)*1100;
            } else {
                tongTienDien = (50 * 500) + (50*650) + (100*850) +(150*1100) + (soKW-350)*1300;
            }
            
            // Thông báo tổng tiền điện sử dụng SweetAlert
            Swal.fire({
                title: `Tiền điện của bạn là: ${tongTienDien}`,
            });

            // Xóa lớp was-validated
            form.classList.remove('was-validated');
    
            // Xóa dữ liệu trong các trường input
            form.reset();
        }, false);
    });    
})();
