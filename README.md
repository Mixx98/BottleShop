# Bottleshop 이용 가이드

세계적인 와인들을 즐길 수 있는 와인 쇼핑몰 Bottleshop

한국에서 보기 힘든 여러 와인들을 치즈와 함께 즐겨보세요. 

와인과 함께 곁들일 수 있는 여러 종류의 치즈도 판매 하고 있습니다.

프로젝트 기간: 2023.02.13 - 2023.02.03 <br>

배포 주소 : http://34.64.96.43/categories

## 화면 흐름도 (Flow chart)
![Bottle_Shop.drawio](/uploads/4572f0ca2b92761eaafa573bbad6164f/Bottle_Shop.drawio.png)

## Development Environment
Node.js Express Mongoose React Bootstrap

## ERD (Model Diagram)
![주문ERD](/uploads/b76ff8ea184bfaf72539a92d5653d511/주문ERD.png)
![비회원ERD](/uploads/7dcbfeea311b6f74c24172a46f7663a9/비회원ERD.png)
<img src="/uploads/7a2e6c2d361a552b646e66ab38bfdff4/회원정보ERD.png" width="500" height="200">
<img src="/uploads/3396d69f3ed7a01bb577dc1a8c830a8d/제품ERD.png" width="500" height="200">
<img src="/uploads/cdc3cc119a58be785a86133344001a25/배송ERD.png" width="500" height="200">


## API 명세서
https://www.notion.so/elice/API-3fdc5a51663349d39e3f01b689bd41e6?pvs=4

## Branch Strategy
| Branch Name   | 설명                       |
|---------------|--------------------------|
| dev           | 개발 브랜치                   |
| feature_front | 프론트 기능 구현 후 1차 merge 브랜치 |
| feature_back  | 백앤드 기능 구현 후 1차 merge 브랜치 |

## Commit Convention      
| 태그 이름 | 설명 |
| --- | --- |
| [FEAT] | 새로운 기능 구현 |
| [CHORE] | 코드 수정 및 추가, 기능 구현중 |
| [ADD] | 라이브러리 추가, 새로운 파일 생성 |
| [DEL] | 쓰지 않는 코드 삭제 |
| [FIX] | 버그 수정, 오류 해결 |
| [MOVE] | 프로젝트 내 파일이나 코드의 이동 |
| [RENAME] | 파일 이름 변경 |
| [DOCS] | README, WIKI 등 문서 개정 |
| [REFACTOR] | 코드 전면 수정이 있을 때 |
| [HOTFIX] | 급한 버그 수정 (issue, QA) |
| [MERGE] | 원격, 로컬 저장소에서 Merge 할 때 사용 |
| [RESOLVE] | confilct 고쳤을 때 |

## Codding Convention
<details>
<summary>변수명</summary>
<div markdown="1"> 
      
- 변수명은 항상 Carmel Case 사용 <br>
- 함수의 경우 동사+명사 사용<br>
    - ex) getInformation()<br>
- flag 변수는 조동사 + flag 종류로 구성 ([flag 변수란?](https://m.blog.naver.com/scyan2011/221610951335))<br>
    - ex) isNum<br>
- 약어는 되도록 사용하지 않는다.
</div>
</details>

<details>
<summary>주석</summary>
<div markdown="1">   
    
- 한 줄 주석은 `//`를 사용한다.<br>
- 그 이상은 `/** */`를 사용한다.
</div>
</details>

## Developers & 담당 업무
| 이름 | MBTI | 포지션 | 담당 업무 | 이메일 |
| --- | --- | --- | --- | --- |
| 손민하 | ENTJ | 백앤드 | 제품, 주문, 배송 | codeminhasohn@gmail.com |
| 김은주 | ISFP | 백앤드 | 회원가입, 게시판 | sherlock22124@gmail.com |
| 윤현수 | ISFJ | 프론트 | 관리자, 회원가입, 로그인  | yhs697248@gmail.com |
| 장재우 | INFJ | 프론트 | 장바구니,주문,레이아웃 | jjang6632@gmail.com |

