document.addEventListener('DOMContentLoaded', () => {
    const averageForm = document.getElementById('averageForm');
    const calculateDailySalesBtn = document.getElementById('calculateDailySalesBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const skuInput = document.getElementById('sku');
    const muInput = document.getElementById('mu');
    const daysInput = document.getElementById('days');
    const dailySalesResultDiv = document.getElementById('dailySalesResult');

    if (averageForm) {
        averageForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const sku = parseFloat(skuInput.value);
            const mu = parseFloat(muInput.value);
            const days = parseFloat(daysInput.value);

            if (isNaN(sku) || isNaN(mu) || isNaN(days) || days <= 0) {
                alert('กรุณากรอกข้อมูลตัวเลขให้ถูกต้อง และจำนวนวันต้องมากกว่า 0');
                return;
            }

            // สูตรคำนวณค่าเฉลี่ย
            const average = ((sku / 12) + (mu / 34)) / (2 * days);
            window.location.href = `average.html?avg=${average.toFixed(2)}`;
        });
    }

    if (calculateDailySalesBtn) {
        calculateDailySalesBtn.addEventListener('click', function() {
            const sku = parseFloat(skuInput.value);
            const mu = parseFloat(muInput.value);
            const days = parseFloat(daysInput.value);

            if (isNaN(sku) || isNaN(mu) || isNaN(days)) {
                dailySalesResultDiv.textContent = 'กรุณากรอกข้อมูล SKU, MU และจำนวนวันให้ครบถ้วน';
                dailySalesResultDiv.style.display = 'block';
                dailySalesResultDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'; // สีแดงเตือน
                dailySalesResultDiv.style.color = '#fff';
                return;
            }
            if (days <= 0) {
                 dailySalesResultDiv.textContent = 'จำนวนวันทำงานต้องมากกว่า 0';
                 dailySalesResultDiv.style.display = 'block';
                 dailySalesResultDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
                 dailySalesResultDiv.style.color = '#fff';
                return;
            }

            // --- ส่วนนี้คือ Placeholder ---
            // !!! โปรดระบุสูตรคำนวณยอดจัดรายวันของคุณที่นี่ !!!
            // ตัวอย่างสมมติ: ยอดจัดรายวัน = (SKU + MU) / จำนวนวัน
            // const dailySales = (sku + mu) / days;
            // dailySalesResultDiv.textContent = `ยอดจัดรายวัน (ตัวอย่าง): ${dailySales.toFixed(2)}`;
            // dailySalesResultDiv.style.backgroundColor = 'rgba(0, 255, 0, 0.2)'; // สีเขียวเมื่อสำเร็จ

            dailySalesResultDiv.textContent = 'โปรดระบุสูตรคำนวณยอดจัดรายวัน';
            dailySalesResultDiv.style.display = 'block';
            dailySalesResultDiv.style.backgroundColor = 'rgba(255, 255, 0, 0.3)'; // สีเหลืองแจ้งเตือน
            dailySalesResultDiv.style.color = '#333'; // สีตัวหนังสือเข้มขึ้นให้อ่านง่าย
        });
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const elem = document.documentElement;
            if (!document.fullscreenElement) {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen().catch(err => console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`));
                } else if (elem.mozRequestFullScreen) { /* Firefox */
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE/Edge */
                    elem.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });

        // ตรวจสอบว่า API Fullscreen รองรับหรือไม่
        function checkFullscreenSupport() {
            const canFullscreen = document.documentElement.requestFullscreen ||
                                  document.documentElement.mozRequestFullScreen ||
                                  document.documentElement.webkitRequestFullscreen ||
                                  document.documentElement.msRequestFullscreen;

            if (!canFullscreen) {
                 fullscreenBtn.style.display = 'none'; // ซ่อนปุ่มถ้าไม่รองรับ Fullscreen
            }
        }
        checkFullscreenSupport();
    }
});
