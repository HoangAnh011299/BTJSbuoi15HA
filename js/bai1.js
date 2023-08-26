
// hàm rút gọn 
function getMyEle(ele){
    return document.getElementById(ele)
}

// lấy đối tượng học sinh
function layDoiTuong(){
    var kq;
    var dt0 = getMyEle('dt0').checked ;
    var dt1 = getMyEle('dt1').checked ;
    var dt2 = getMyEle('dt2').checked ;
    var dt3 = getMyEle('dt3').checked ;

    if(dt0) {
        kq = 0;
    } else if(dt1) {
        kq = 2.5;
    } else if(dt2) {
        kq = 1.5;
    } else if(dt3) {
        kq = 1;
    } 
    return kq;
}

// lấy khu vực học sinh
function layKhuVuc(){
    var kq;
    var kvA = getMyEle('kvA').checked ;
    var kvB = getMyEle('kvB').checked ;
    var kvC = getMyEle('kvC').checked ;
    var kvX = getMyEle('kvX').checked ;

    if(kvA) {
        kq = 2;
    } else if(kvB) {
        kq = 1;
    } else if(kvC) {
        kq = 0.5;
    } else if(kvX) {
        kq = 0;
    } 
    return kq;
}

// hàm bọc ngoài là hàm xử lý validation khi nhập thiếu input
(function () {
    'use strict';

    const forms = document.querySelectorAll('.requires-validation');

    Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
    
            const diemChuan = parseFloat(document.getElementById("diemChuan").value);
            const diemMon1 = parseFloat(document.getElementById("diemMon1").value);
            const diemMon2 = parseFloat(document.getElementById("diemMon2").value);
            const diemMon3 = parseFloat(document.getElementById("diemMon3").value);
    
            const isValid = form.checkValidity();
    
            if (!isValid) {
                Swal.fire({
                    icon: 'error',
                    title: 'Vui lòng nhập đủ thông tin!',
                  })
                form.classList.add('was-validated');
                return;
            }
    
            // Kiểm tra xem có điểm liệt hay không
            const isFailed = diemMon1 === 0 || diemMon2 === 0 || diemMon3 === 0;
    
            if (isFailed) {
                Swal.fire({
                    icon: 'error',
                    title: 'Bạn có điểm liệt nên không đậu nguyện vọng',
                  })
                // alert("Bạn có điểm liệt nên không đậu nguyện vọng");
                 // Xóa lớp was-validated
                form.classList.remove('was-validated');
    
                // Xóa dữ liệu trong các trường input
                form.reset();
                return;
            }
    
            // Lấy điểm ưu tiên và điểm khu vực
            const doiTuong = layDoiTuong();
            const khuVuc = layKhuVuc();
    
            // Tính toán điểm ưu tiên và tổng điểm
            const diemUuTien = doiTuong + khuVuc;
            const diemTongKet = diemMon1 + diemMon2 + diemMon3 + diemUuTien;
    
            // So sánh điểm tổng kết và điểm chuẩn
            diemTongKet >= diemChuan
                ?Swal.fire(
                    'Chúc mừng bạn đã đậu nguyện vọng',
                    '',
                    'success'
                  )
             
                : Swal.fire({
                    icon: 'error',
                    title: 'Bạn không đủ điểm đậu nguyện vọng',
                  })

            // Xóa lớp was-validated
            form.classList.remove('was-validated');
    
            // Xóa dữ liệu trong các trường input
            form.reset();
        }, false);
    });    
})();
