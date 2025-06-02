<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>โปรแกรมคำนวนค่าเฉลี่ย Order Picker</title>
  <!-- โหลด Google Font Kanit -->
  <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <style>
    /* ตั้งฟอนต์ให้ทั้งหน้าใช้ Kanit */
    body, input, button, p, h1, h2, h3, h4, h5, h6 {
      font-family: 'Kanit', sans-serif;
      font-weight: 400;
      line-height: 1.5;
    }
    /* สไตล์กล่อง input กับปุ่มกากบาท */
    .input-clear-wrapper {
      position: relative;
      margin: 0.5em 0;
      width: 100%;
      max-width: 300px;
      margin-left: auto;
      margin-right: auto;
    }
    .input-clear-wrapper input[type=number] {
      width: 100%;
      padding-right: 2.5em; /* เผื่อที่ให้ปุ่มกากบาท */
      font-size: 1.1em;
      box-sizing: border-box;
    }
    .clear-btn {
      position: absolute;
      right: 0.5em;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      font-size: 1.3em;
      color: #888;
      cursor: pointer;
      user-select: none;
      padding: 0;
      line-height: 1;
      opacity: 0.6;
      transition: opacity 0.2s;
    }
    .clear-btn:hover {
      opacity: 1;
      color: #f33;
    }
  </style>
</head>
<body>
  <div class="background"></div>

  <div class="content-wrapper fade-slide-in">
    <main>
      <h1 class="title-no-wrap">โปรแกรมคำนวนค่าเฉลี่ย Order Picker</h1>
      <form id="averageForm" class="centered-form">
        <div class="input-clear-wrapper">
          <input type="number" id="sku" placeholder="SKU" required />
          <button type="button" class="clear-btn" aria-label="ลบค่า SKU" data-target="sku">×</button>
        </div>
        <div class="input-clear-wrapper">
          <input type="number" id="mu" placeholder="MU" required />
          <button type="button" class="clear-btn" aria-label="ลบค่า MU" data-target="mu">×</button>
        </div>
        <div class="input-clear-wrapper">
          <input type="number" id="days" placeholder="จำนวนวันทำงาน" required />
          <button type="button" class="clear-btn" aria-label="ลบค่าจำนวนวันทำงาน" data-target="days">×</button>
        </div>
        <button type="submit">คำนวณค่าเฉลี่ย</button>
      </form>
    </main>

    <footer>
      <p>เว็บไซต์นี้ถูกพัฒนาขึ้นเพื่อเป็นเครื่องมือช่วยในการคำนวณและแสดงผลค่าเฉลี่ยออเดอร์ต่อวันอย่างง่ายดาย</p>
      <p>โดยเน้นให้ผู้ใช้งานสามารถกรอกข้อมูลและรับผลลัพธ์ได้อย่างรวดเร็วและสะดวกสบาย</p>
      <p>ตัวเว็บออกแบบ UI ให้ดูทันสมัย ใช้งานง่าย สีสันสบายตา และตอบโจทย์การใช้งานจริง</p>
      <p>โค้ดถูกเขียนด้วย HTML, CSS และ JavaScript เพื่อให้โหลดไวและทำงานได้บนทุกอุปกรณ์ รวมถึงฟีเจอร์เปิดเต็มจอ เพื่อเพิ่มความชัดเจนในการแสดงผล และการเข้าถึงข้อมูลอย่างรวดเร็ว</p>
      <p>พัฒนาโดย Jack Makro © 2025</p>
      <p>ทีมงานผู้ดูแลระบบ: Jack Makro, Team Dev RoshanzeroX</p>
      <p>ขอบคุณทุกท่านที่สนับสนุนและใช้งานเว็บไซต์นี้</p>
      <p>หากพบปัญหาหรือข้อเสนอแนะสามารถติดต่อได้ที่ P'Jack OCS Lock 12</p>
    </footer>
  </div>

  <button id="duckButton" class="floating-button left" aria-label="ไปหน้าเลือกเพลง">🦆</button>
  <button id="fullscreenButton" class="floating-button right" aria-label="เปิด/ปิดเต็มจอ">📱</button>

  <script src="script.js"></script>
</body>
</html>
