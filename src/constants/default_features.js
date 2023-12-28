const defaultFeatures = [
  {
    index: "oa",
    label: "OA-辦公系統",
    children: [
      {
        index: "oaa",
        label: "OAA-行政類",
        children: [
          {
            index: "oaa02",
            label: "OAA02-用印申請單"
          },
          {
            index: "oaa03",
            label: "OAA03-機票申請單"
          }
        ]
      },
      {
        index: "oab",
        label: "OAB-人事類",
        children: [
          {
            index: "oab01",
            label: "OAB01-加班申請單"
          },
          {
            index: "oab02",
            label: "OAB02-請假申請單"
          },
          {
            index: "oab04",
            label: "OAB04-指紋異常申請單"
          },
          {
            index: "oab05",
            label: "OAB05-公出申請單"
          },
          {
            index: "oab06",
            label: "OAB06-員工獎懲單"
          }
        ]
      },
      {
        index: "oad",
        label: "OAD-資訊類"
      },
      {
        index: "oae",
        label: "OAE-文管類",
        children: [
          {
            index: "oae01",
            label: "OAE01-發行文件一覽表"
          },
          {
            index: "oae02",
            label: "OAE02-管理文件申請單"
          },
          {
            index: "oae03",
            label: "OAE03-ECN_TECN變更申請"
          },
          {
            index: "oae04",
            label: "OAE04-外來文件申請"
          }
        ]
      }
    ]
  },
  {
    index: "mf",
    label: "MF-制造管理",
    children: [
      {
        index: "mfa",
        label: "MFA-基本資料維護",
        children: [
          {
            index: "mfa01",
            label: "MFA01-產品資料維護"
          }
        ]
      },
      {
        index: "mfb",
        label: "MFB-進貨派工作業",
        children: [
          {
            index: "mfb01",
            label: "MFB01-晶圓進貨資料"
          }
        ]
      }
    ]
  },
  {
    index: "hr",
    label: "HR-人力資源",
    children: [
      {
        index: "hrc",
        label: "HRC-考勤管理",
        children: [
          {
            index: "hrc04",
            label: "HRC04-指紋考勤記錄"
          }
        ]
      },
      {
        index: "hre",
        label: "HRE-薪資管理",
        children: [
          {
            index: "hre02",
            label: "HRE02-薪資查詢"
          }
        ]
      }
    ]
  },
  {
    index: "sl",
    label: "SL-業務相關",
    children: []
  },
  {
    index: "ep",
    label: "EP-工程相關",
    children: [
      {
        index: "epb",
        label: "EPB-點測機台驗證設定",
        children: [
          {
            index: "epb19",
            label: "EPB19-點測標準片歸還總表"
          }
        ]
      },
      {
        index: "epd",
        label: "EPD-掃瞄機台驗證設定",
        children: [
          {
            index: "epd04",
            label: "EPD04-AOI標準片總表"
          },
          {
            index: "epd05",
            label: "EPD05-AOI標準片歸還總表"
          }
        ]
      }
    ]
  },
  {
    index: "rs",
    label: "RS-報表相關",
    children: [
      {
        index: "rst",
        label: "RST-EO相關"
      },
      {
        index: "rso",
        label: "RSO-扣留相關"
      }
    ]
  },
  {
    index: "ms",
    label: "MS-系統管理",
    children: [
      {
        index: "msa",
        label: "MSA-消息中心"
      }
    ]
  }
]

export default defaultFeatures