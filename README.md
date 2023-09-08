# 원티드 프리온보딩 프론트엔드 12차 3주차 과제 - 18팀

## 📚 과제

동료학습을 통해서 팀에서 생각한 원티드 프리온보딩 프론트엔드 3주차 과제의 Best Pratice를 만들고 제출해주세요.

> Best Practice란 팀원들이 각자의 구현 방법을 설명하고 토론했을 때 팀 안에서 이 방법이 가장 효율적이라고 판단되는 것

## 🚀 실행 방법 및 프리뷰

```bash
$ npm install
$ npm start
```
### 구현 기능
- [x] 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
  - [x] 검색어가 없을 시 “검색어 없음” 표출
- [x] API 호출별로 로컬 캐싱 구현
    - [x] 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
    - [x] expire time을 구현
- [x] 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
- [x] API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정
- [x] 키보드만으로 추천 검색어들로 이동 가능하도록 구현
  
### 배포 링크

✌️ 개인의 서버에 올린 작업물로 2023년 10월부터는 접속이 불가 할 수 있는 점 양해바랍니다.

🔗 [배포 링크](http://preonboarding-frontend-12th-jk.s3-website.ap-northeast-2.amazonaws.com/)

🔧 [배포 트러블슈팅](https://www.notion.so/Uncaught-in-promise-ReferenceError-caches-is-not-defined-09b55f877dcc446d976c66490fb6c901)

### 구현 영상

|            검색 결과 표시     |       키보드로 추천 검색어 이동      |
| :-------------------------: | :-----------------------------------------------: |
| <img width="400" alt="issueList_gif" src="https://github.com/preOnBorading-Idle/pre-onboarding-12th-3-18/assets/101536766/e3c26e96-af44-4792-8d0b-5a23de39df0b" /> | <img width="400" alt="issueDetail_gif" src="https://github.com/preOnBorading-Idle/pre-onboarding-12th-3-18/assets/101536766/ed64410f-86ed-412c-b6f1-83b6716a383c" />|


|                   Api 호출            |     추천 검색어 캐싱   |
| :----------------------------: | :-----------------------------------: |
| <img width="400" alt="404" src="https://github.com/preOnBorading-Idle/pre-onboarding-12th-3-18/assets/101536766/93df7a13-ccc9-4338-be23-f1584e4ccf63"> | <img width="400" alt="notopen" src="https://github.com/preOnBorading-Idle/pre-onboarding-12th-3-18/assets/101536766/461ae665-ca2a-489d-a07f-f213036e07da"> |

## ✨ Best Practice 논의

### 1. 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
### 🤔 디바운싱 vs 쓰로틀링
**디바운싱 (Debouncing):**

디바운싱은 연속적인 이벤트 중 마지막 이벤트 발생 이후 일정 시간(대기 시간)이 지나야 작업이 실행되도록 하는 기술. 예를 들어 검색창에 입력이 있을 때, 디바운싱을 사용하면 사용자가 입력을 완료하기 전까지 API 호출을 지연시킬 수 있다.

👍 장점:

> 1. 사용자 입력을 기다리는 동안 불필요한 API 호출을 방지하므로 네트워크 및 서버 부하를 줄일 수 있다.
> 2. 사용자가 입력을 지속적으로 수정하는 경우에도 마지막 입력 이후에만 API를 호출하므로 효율적이다.
> 3. 입력을 완료하기 전까지 기다리지 않고 중간 결과를 제공할 수 있어서 사용자 경험을 향상시킬 수 있다.

👎 단점:

> 1. 일정 시간 동안 API 호출이 지연되기 때문에 실시간 업데이트가 필요한 경우에는 적합하지 않을 수 있다.
> 2. 대기 시간 설정이 중요한데, 만약 너무 길게 설정하면 사용자 경험이 저하될 수 있다.

**쓰로틀링 (Throttling):**

쓰로틀링은 연속적인 이벤트에 대해 일정 시간 간격으로 작업을 실행하도록 하는 기술. 지속적으로 발생하는 이벤트에 대한 작업을 제어할 때 유용하다.

👍 장점:

> 1. 지속적으로 발생하는 이벤트를 일정한 간격으로 제한하여 불필요한 작업을 방지한다.
> 2. API 호출 빈도를 제어하므로 서버 및 클라이언트 부하를 줄일 수 있다.
> 3. 빠른 실시간 업데이트가 필요한 경우에도 정기적인 간격으로 작업을 실행할 수 있다.

👎 단점:

> 1. 사용자 입력이 빠르게 발생할 경우에도 일정한 간격으로 작업이 실행되므로 사용자 경험에 영향을 미칠 수 있다.
> 2. 일정한 간격으로 작업을 실행하기 때문에 디바운싱보다는 더 빈번한 작업이 실행된다.

### 😎 결과

요약하자면, 저희 팀원들은 상황에 따라 적절한 방법을 쓰는 것의 효율성을 고려하여 **사용자 입력을 기다려야하는 지금과 같은 경우에는 디바운싱을 사용하는 것이 불필요한 API 호출을 방지**하는 면에서 더 적절하다고 판단했습니다.

아래의 표는 저희 팀원들의 구현 방법입니다.

| 이름 | 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행 |
| --- | --- |
| 김태완 | useDebounce 훅으로 분리 debounce setTimeout을 사용하여 구현 |
| 이윤주 | useDebounce 커스텀훅을 생성하여 검색 디바운싱 구현 ⇒ setTimeout 사용하여 일정 시간 지정 |
| 장준희 | useDebounce 훅 구현 : setTimeout을 사용해서 일정 시간 동안 키보드 입력이 없을 때 api 호출되도록 구현. |
| 허완 | useGetList 커스텀 훅을 생성, 캐싱처리된 데이터를 리턴하는 upateData 함수를 setTimeout를 사용하여 debounce 처리 |
| 양정규 | useDebounce → setTimeout으로 구현 |

**팀원들과 논의 한 결과, setTimeout을 사용해서 구현한 디바운싱 로직을 useDebounce 훅으로 분리하여 적용하는 방법을 best practice로 채택하였습니다.**

```ts
function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [value, delay]);

	return debouncedValue;
}
```

---
### 2. 키보드 만으로 추천 검색어들로 이동 가능하도록 구현

### 🤔 useRef vs useState

**useRef:**

👍 장점:

> 1. useRef를 사용하면 DOM 요소나 기타 참조를 관리하기 쉽다.
> 2. useRef를 사용하면 해당 참조가 변경되어도 컴포넌트의 리렌더링이 발생하지 않는다. 이를 통해 불필요한 리렌더링을 방지할 수 있다.
> 3. useRef로 관리되는 값은 리렌더링 간에 보존되므로 이전 값에 접근할 수 있다.

👎 단점:

> 1. useRef로 관리되는 값은 변경된다고 해서 컴포넌트의 리렌더링이 발생하지 않는다. 따라서 상태 변화를 감지하기 어렵다. 즉, 상태 변경에는 useState가 더 적합하다.

**useState:**

👍 장점:

> 1. useState를 사용하면 컴포넌트의 상태를 관리하기 쉽다. 검색 결과 리스트의 포커스 상태, 검색어 입력 상태 등을 관리하는 데 유용하다.

👎 단점:

> 1. useState를 사용하면 불필요한 리렌더링이 발생할 수 있다.
> 2. onKeyDown 이벤트 중복으로 2번 실행되는 문제 발생
> > - 키보드 이벤트 핸들러가 두 번 호출되는 현상 (글자가 조합 중인지 조합이 끝난 상태인지를 알 수 없어 생기는 문제)
> > - if (e.nativeEvent.isComposing) return; 코드 추가 // e.native.isComposing이 true이면 함수를 리턴하게 함으로써 중복을 방지하도록 해결

### 😎 결과
요약하자면, 저희 팀원들은 **DOM 요소나 참조를 관리하기에 유용하며 불필요한 리렌더링도 줄일 수 있는 useRef를 사용**하는 것이 더 적절하다고 판단했습니다. (+ useRef는 react에서 dom 조작을 위해 권장하는 훅)

아래의 표는 저희 팀원들의 구현 방법입니다.

| 이름 | 키보드 만으로 추천 검색어들로 이동 가능하도록 구현 |
| --- | --- |
| 김태완 | useState로 index 이동으로 구현<br/>onKeyDown 함수로 ArrowUp / Down |
| 이윤주 | useState를 사용하여 추천검색어 데이터 배열의 index 이동으로 구현<br/>키보드 이벤트를 이용해 onKeyDown 함수를 구현하여 ArrowUp, ArrowDown, Enter 이벤트별로 이벤트 처리하도록 구현 |
| 장준희 | useRef를 사용하여 DOM 요소 이동 가능하도록 구현.<br/>1. 검색어 입력 폼에서 화살표 아래키로 추천 검색어로 이동<br/>2. 추천 검색어 내에서 화살표 위, 아래키로 이동<br/>3. 추천 검색어에서 엔터 키를 누르면 다시 검색어 입력 폼으로 focus 이동 |
| 허완 | useRef 사용 시도(미구현) |
| 양정규 | onKeyDown<br/>→ArrowDown, ArrowUp, Enter에 동작하는 state 변수를 이용<br/>*useRef방식으로 리팩토링 예정 |


**useRef를 사용하여 DOM 요소에 접근하고, useState를 사용하여 검색 결과 리스트의 포커스 상태, 검색어 입력 상태 등을 관리하는 방법을 best practice로 채택하였습니다.**

```ts
const handleResultKeyDown = (...) => {
		const length = searchResults.length < MAX_LIST_NUM ? searchResults.length : MAX_LIST_NUM;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			const nextIndex = (index + 1) % length;
			setFocusedIndex(nextIndex);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			const prevIndex = (index - 1 + length) % length;
			setFocusedIndex(prevIndex);
		} else if (e.key === 'Enter') {
			setInput(result.sickNm);
			inputRef.current?.focus();
		}
	};
...
searchResults.slice(0, MAX_LIST_NUM).map((result, index) => (
	<div
    ...
    className={`${styles.resultItem} ${focusedIndex === index ? styles.focusedItem : ''}`} 
    ref={ref => (resultRefs.current[index] = ref)}
  >...</div>
				))
```

---
### 3. API 호출 별로 로컬 캐싱 구현 (+ expire time)

### 🤔 로컬 스토리지 vs 캐시 스토리지

**로컬 스토리지 (LocalStorage):**

👍 장점:

> 1. 로컬 스토리지에 저장된 데이터는 브라우저를 종료하고 다시 열어도 유지된다. 따라서 장기적인 데이터 보존에 적합하다.
> 2. 로컬 스토리지는 키-값 형식으로 데이터를 저장하고 불러오는 데 간단하게 사용할 수 있다.

👎 단점:

> 1. 로컬 스토리지의 저장 용량은 브라우저마다 다를 수 있지만, 일반적으로 5~10MB 정도로 제한되어 있다. 따라서 큰 데이터나 대용량 캐싱에는 부적합할 수 있다.

**캐시 스토리지 (CatchStorage):**

👍 장점:

> 1. 캐시 스토리지는 일반적으로 로컬 스토리지보다 큰 용량을 가질 수 있다. 따라서 대용량 데이터 캐싱에 적합하다.
> 2. 캐시 스토리지는 서비스 워커와 함께 사용하여 오프라인 액세스와 프로그레시브 웹 앱(PWA) 개발에 유용하다.

👎 단점:

> 1. 캐시 스토리지를 사용하기 위해서는 서비스 워커와 같은 고급 웹 기술에 대한 이해가 필요할 수 있다.

### 😎 결과

요약하자면, 저희 팀원들은 **익숙한 로컬 스토리지와 비슷한 기능을 하면서도 용량이 더 큰 캐시 스토리지를 사용**하는 것이 더 적절하다고 판단했습니다.

**하나의 캐시 스토리지에 object형식으로 key와 expire time을 넣고, 입력한 검색어와 동일한 key가 스토리지에 있으면 해당 값을 꺼내오고, 동일한 key가 없으면 api 호출을 하는 방식을 best practice로 채택하였습니다.**

```ts
export const setCacheByExpireTime = async ({...}: {...}) => {
	const cache = await caches.open('cache');
	const item = {
		value,
		expiry: new Date().getTime() + expireTime,
	};
	const response = new Response(JSON.stringify(item));
	await cache.put(key, response);
};
```

### 3-1. expire time 검사

### 🤔 setInterval로 주기적으로 검사 vs api 호출 시 마다 검사

**setInterval로 주기적으로 검사하는 방법:**

👍 장점:

> 1. 사용자가 많을 경우, api 호출 시 마다 검사하는 방법보다 주기적인 검사를 하는 방법이 API 호출을 줄일 수 있어서 서버 부하와 네트워크 트래픽을 감소시킨다.
> 2. 데이터의 만료 여부를 주기적으로 확인함으로써 캐시 데이터를 관리하면서도 성능을 최적화할 수 있다.
> 3. 주기적인 검사는 서버에서 데이터를 업데이트하는 데 필요한 시간보다 더 짧게 설정되어야 한다. 그렇지 않으면 사용자는 항상 만료된 데이터를 받게 된다.

👎 단점:

> 1. 검사 간격에 따라 캐시의 유효성을 확인하기 때문에, 만료된 데이터가 바로 삭제되지 않을 수 있다.
> 2. 사용자가 최신 데이터를 보려면 검사가 끝나기를 기다려야 한다.

**API 호출 시 마다 검사하는 방법::**

👍 장점:

> 1. 요청 즉시 캐시의 유효성을 확인할 수 있으므로, 데이터가 만료되었을 때 빠르게 업데이트할 수 있다.
> 2. 사용자가 데이터를 요청할 때마다 항상 최신 데이터를 제공할 수 있다.

👎 단점:

> 1. API 호출마다 캐시의 유효성을 확인하기 때문에 불필요한 네트워크 트래픽이 발생할 수 있다.
> 2. 많은 요청이 들어오면 서버에 부하를 줄 수 있다.

### 😎 결과

요약하자면, 저희 팀원들은 **캐시 스토리지에 저장되어있는 데이터들의 expire time을 검사할 때, 현재로써는 사용자가 많지 않기 때문에 주기적으로 검사하는 방법보다 api 호출 시 마다 검사하는 방법을 사용**하는 것이 효율적인 측면에서 더 적절하다고 판단했습니다.

아래 사진은 저희 팀원들의 구현 방법입니다.

| 이름 | API 호출 별로 로컬 캐싱 구현 (+ expire time) |
| --- | --- |
| 김태완 | cache Storage의 header에 expire시간을  같이 저장하여 삭제. <br/> 캐시 자체가 한 검색한 값으로 header에 넣는게 관리하기 용이해서 사용 |
| 이윤주 | cache Storage를 이용하여 로컬 캐싱 구현 : 키값을 확인하여 캐시스토리지에서 그 키값의 값이 있는지 확인하고 없으면 api를 호출하여 받아온 키값, 응답값을 캐시 스토리지에 저장해서 구현 (로컬스토리지, 세션스토리지는 5mb의 용량제한이 있음) <br/> expire time : setInterval로 주기적으로 검사 vs api 호출시마다 검사 <br/> expire time을 따로 지정해서 시간이 지나면 캐시값 삭제하기 |
| 장준희 | api 호출로 받은 응답을 캐시 스토리지에 저장 <br/> 해당 응답을 cachedData라는 state에 저장하고, 그 응답의 expire time을 cacheExpireTimes 라는 state에 저장 <br/> expire time이 지나면 cacheExpireTimes 가 변화 <br/> useEffect의 의존성 배열에 cacheExpireTimes를 삽입하여 expire time이 변했을 때 실행되도록 구현(but, 실제로 useEffect 내에서 사용하지 않는 변수를 삽입해서 좋지 않은 방법 같음) → useEffect 내에서 setInterval로 지정 시간마다 만료된 데이터 제거 <br/> 문제점 : 새로고침 시, 캐싱과 관련된 state 값이 사라져서 캐시 스토리지에 있던 캐싱 데이터가 남아있게됨. |
| 허완 | cache Storage 사용. <br/> getCacheData 함수에 input(검색어) 값을 전달하고 cacheStorage에 해당 input 값이 있으면 cacheStorage의 값을 리턴, 없으면 api 호출 후 응답 값을 cacheStorage에 저장 및 리턴 <br/> expire time : 브라우저 실행 시 setInterval 함수 실행. 특정 시간이 경과 되면 cacheStorage의 모든 값을 한번에 제거 |
| 양정규 | Cache Storage vs local Storage <br/> → Google에서 ‘LocalStorage는 동기식이며 기본 스레드를 차단하므로 사용을 피해야 합니다. 약 5MB로 제한되며 문자열만 포함할 수 있습니다. 웹 작업자 또는 서비스 작업자가 액세스할 수 없습니다.’라고 cache storage를 권장하는 글이 있어 cache storage를 사용 <br/> Cache Storage 구현 <br/> → 하나의 캐시 스토리지에 object형식으로 key와 expire time을 넣는 방식으로 구현 <br/> expirte time <br/> → 현재는 api 호출이 발생할 경우 expire time 삭제 트리거로 구현됨 <br/> *즉시 캐시의 유효성을 확인할 수 있으므로, 데이터가 만료되었을 때 빠르게 업데이트가 가능하고 사용자가 데이터를 요청할 때마다 항상 최신 데이터를 제공할 수 있기 때문에 채택함 |


**api 호출 요청 시, 캐시 스토리지에 저장되어 있는 데이터들의 expire time을 모두 검사해서 expire time이 지난 데이터들을 삭제하는 방식을 best practice로 채택하였습니다.**

```ts
export const getCacheByKey = async (key: string) => {
  ...
	await Promise.all(
		cachedResponses.map(async (response, index) => {
			if (response && response.ok) {
				try {
					const jsonData = await response.json();
					if (jsonData.expiry < new Date().getTime()) {
						cache.delete(keys[index]);
					}
				} catch (error) {
					return false;
				}
			}
		}),
	);
  ...
};
```

---

### 4. 아이콘 호출 방법

### 🤔 로컬 vs 외부 URL vs 라이브러리(eg.react-icon)

**로컬:**

👍 장점:

> 1. 인터넷 연결이 없어도 로딩 가능하다.
> 2. 외부에서 접근하는 것보다 상대적으로 로딩 시간이 빠르다.

👎 단점:

> 1. 앱의 리소스가 발생한다.
> 2. 리소스를 업데이트하려면 앱의 새 버전을 배포해야 한다.

**외부 URL:**

👍 장점:

> 1. 앱의 리소스를 발생시키지 않아 번들 크기에 영향을 주지 않는다.
> 2. 리소스를 업데이트하면 모든 사용자가 즉시 해당 업데이트를 볼 수 있다.

👎 단점:

> 1.  인터넷 연결이 끊어지거나 서버에 문제가 발생하면 아이콘을 불러올 수 없다.
> 2.  추가적인 네트워크 요청이 필요하므로 로딩 시간에 영향을 줄 수 있다.

**라이브러리(eg.react-icon):**

👍 장점:

> 1. SVG의 벡터 형식을 지원하기 때문에 확대/축소 시 품질 저하가 없다.
> 2. React 컴포넌트로 제공되므로 스타일링과 이벤트 처리가 용이하다.

👎 단점:

> 1.  필요하지 않은 아이콘까지 번들에 포함되어 앱의 크기가 커질 수 있다.


### 😎 결과

요약하자면, 저희 팀원들은 **외부에서 리소스를 제공하는 방식보다 로컬에 리소스를 저장하는 방식을 사용**하는 것이 더 적절하다고 판단했습니다.

**assets 폴더에 공용으로 쓰는 아이콘 svg파일을 생성하고 내부에서 호출하는 방식을 best practice로 채택하였습니다.**

```svg
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.0002 20L15.6572 15.657M15.6572 15.657C16.4001 14.9141 16.9894 14.0321 17.3914 13.0615C17.7935 12.0909 18.0004 11.0506 18.0004 9.99996C18.0004 8.94936 17.7935 7.90905 17.3914 6.93842C16.9894 5.96779 16.4001 5.08585 15.6572 4.34296C14.9143 3.60007 14.0324 3.01078 13.0618 2.60874C12.0911 2.20669 11.0508 1.99976 10.0002 1.99976C8.9496 1.99976 7.90929 2.20669 6.93866 2.60874C5.96803 3.01078 5.08609 3.60007 4.34321 4.34296C2.84288 5.84329 2 7.87818 2 9.99996C2 12.1217 2.84288 14.1566 4.34321 15.657C5.84354 17.1573 7.87842 18.0002 10.0002 18.0002C12.122 18.0002 14.1569 17.1573 15.6572 15.657Z" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

```
---

## 📁 디렉토리 구조
```
📦src
 ┣ 📂api
 ┃ ┗ 📜Api.ts
 ┣ 📂assets
 ┃ ┗ 📜search.svg
 ┣ 📂components
 ┃ ┣ 📂SearchResults
 ┃ ┃ ┣ 📜SearchResults.module.scss
 ┃ ┃ ┗ 📜SearchResults.tsx
 ┃ ┗ 📂loadingSpinner
 ┃ ┃ ┣ 📜LoadingSpinner.module.scss
 ┃ ┃ ┗ 📜LoadingSpinner.tsx
 ┣ 📂constants
 ┃ ┗ 📜constants.ts
 ┣ 📂hooks
 ┃ ┗ 📜useDebounce.tsx
 ┣ 📂pages
 ┃ ┣ 📂MainPage
 ┃ ┃ ┣ 📜Main.module.scss
 ┃ ┃ ┗ 📜Main.tsx
 ┃ ┗ 📂NotFoundPage
 ┃ ┃ ┣ 📜NotFound.module.scss
 ┃ ┃ ┗ 📜NotFound.tsx
 ┣ 📂types
 ┃ ┗ 📜SearchWord.interface.ts
 ┣ 📂utils
 ┃ ┣ 📜cache.ts
 ┃ ┗ 📜changeInput.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┗ 📜react-app-env.d.ts
 ```

## ✅ 팀 컨벤션
### 브랜치 형식
    
    main
    |_develop
    	|_feature/a
    	|_feature/b
    	|_feature/c
    
### 커밋 메세지
- 💬
    
    | 종류  | 의미 |
    | --- | --- |
    | feat | 새로운 기능을 추가할 경우 |
    | fix | 버그를 고친 경우 |
    | docs | 문서를 수정한 경우 |
    | style | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우 |
    | refactor | 프로덕션 코드 리팩토링 |
    | chore | 기타 변경사항 |
    | test | test 관련한 코드의 추가, 수정한 경우 |
    | design | CSS 등 사용자 UI 디자인 변경 |
    | comment | 필요한 주석 추가 및 변경 |
    | rename | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 |
    | remove | 파일을 삭제하는 작업만 수행한 경우 |
    | !HOTFIX | 급하게 치명적인 버그를 고쳐야하는 경우 |

### git actions

```jsx
on:
  pull_request:
    types: [opened]
  issues:
    types: [opened]

jobs:
  assign:
    runs-on: ubuntu-latest
    steps:
      - if: ${{ github.event.issue }}
        uses: actions-cool/issues-helper@v3
        with:
          actions: 'add-assignees'
          assignees: ${{ github.event.issue.user.login }}
          token: ${{ secrets.TOKEN }}

      - if: ${{ github.event.pull_request }}
        uses: hkusu/review-assign-action@v1
        with:
          assignees: ${{ github.event.pull_request.user.login }}
          reviewers: ${{ vars.REVIEWERS }}
          github-token: ${{ secrets.TOKEN }}

  project:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/add-to-project@main
        with:
          project-url: ${{ vars.PROJECT_URL }}
          github-token: ${{ secrets.TOKEN }}

```

### 😎 결과

기존 프로젝트들을 하면서 issue 기능을 자주 사용하였는데, 추가적으로 이 부분도 **자동적으로 해주면 좋을 것 같아 Actions를 구현**하였습니다.
github-token은 secret으로, REVIEWERS와 PROJECT_URL은 var로 관리하여 불러오게 변수를 설정하였습니다.

issue와 pull_request가 등록이 되면 자동으로 assignees를 등록해주고, REVIEWERS를 등록해주는 actions을 넣어 더욱 편리해졌습니다.

## 기술스택 

### Environment

<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/visual Studio code-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white"> 

### Config

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"> <img src="https://img.shields.io/badge/husky-FF4088?style=for-the-badge&logo=hugo&logoColor=white">

### Development

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">

### Library
<img src="https://img.shields.io/badge/scss-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>

### Communication

<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

### Deploy

<img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=AmazonEC2&logoColor=white"> <img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"> 

## 팀원 소개
|          [@richcollector](https://github.com/richcollector)           |          [@jungkyuYang](https://github.com/jungkyuYang)          |          [@lyeejj](https://github.com/lyeejj)         |          [@junhui324](https://github.com/junhui324)            |         [@heowan](https://github.com/heowan)           |
| :------------------------------------------------------: | :----------------------------------------------------: | :------------------------------------------------------------------: | :----------------------------------------------------------: | :--------------------------------------------------------: |
| ![richcollector의 프로필 사진](https://github.com/richcollector.png) | ![jungkyuYang 프로필 사진](https://github.com/jungkyuYang.png) | ![lyeejj의 프로필 사진](https://github.com/lyeejj.png) | ![junhui324의 프로필 사진](https://github.com/junhui324.png) | ![heowan의 프로필 사진](https://github.com/heowan.png) |
