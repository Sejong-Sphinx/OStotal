document.addEventListener('DOMContentLoaded', () => {

	// 좋아요 & 싫어요 버튼 기능

	const likeIcon = document.querySelectorAll('.likeIcon');
	const dislikeIcon = document.querySelectorAll('.dislikeIcon');

	likeIcon.forEach(element => {
		element.addEventListener('click', (e) => {
			if (e.target.src === 'http://127.0.0.1:5500/img/like.png') {
				e.target.src = '../img/like_filled.png';
				e.target.parentNode.children[1].innerHTML++;
			} else {
				e.target.src = '../img/like.png';
				e.target.parentNode.children[1].innerHTML--;
			}
		})
	});

	dislikeIcon.forEach(element => {
		element.addEventListener('click', (e) => {
			if (e.target.src === 'http://127.0.0.1:5500/img/dislike.png') {
				e.target.src = '../img/dislike_filled.png';
				e.target.parentNode.children[1].innerHTML++;
			} else {
				e.target.src = '../img/dislike.png';
				e.target.parentNode.children[1].innerHTML--;
			}
		})
	});


	// 해시태그 추가 기능

	const tagIsEmpty = tag => {
		if (tag == undefined || tag == null || tag.length <= 0) {
			alert("태그가 비어있습니다.");
			return false;
		}
		return true;
	};
	const makeTag = tag => {
		const tagWrap = document.createElement("div");
		tagWrap.className = "tag";
		tagWrap.addEventListener("click", removeTag);
		const tagTitle = document.createElement("p");
		tagTitle.textContent = tag;
		tagWrap.appendChild(tagTitle);
		return tagWrap
	};
	const appendTag = (parentId, referenceId, newNode) => {
		const parentElement = document.querySelector(`#${parentId}`);
		const referenceElement = document.querySelector(`#${referenceId}`);
		parentElement.insertBefore(newNode, referenceElement);
	};
	const clearTextContent = targetId => {
		const target = document.querySelector(`#${targetId}`);
		target.value = '';
	};
	const addTag = e => {
		const { keyCode, target } = e;
		const { value: tagText } = target;

		if (keyCode == 13 && tagIsEmpty(tagText)) {
			appendTag("tagList", "tag", makeTag('# ' + tagText));
			clearTextContent("tag");
		}
	};
	const removeTag = e => { e.currentTarget.remove(); };
	const tagInput = document.querySelector("#tag");
	tagInput.addEventListener("keyup", addTag);


	// Add comment 버튼 클릭 시
	document.querySelector('#commentButton').addEventListener('click', () => {
		document.querySelector('#hiddenCard').style.display = "block";

		document.querySelector('#newName').innerHTML = document.querySelector('#username').value;
		document.querySelector('#newContent').innerHTML = document.querySelector('#commentInput').value;
		document.querySelector('#newTag').innerHTML = document.querySelector('#tagList').children[0].children[0].innerHTML;

		document.querySelector('#username').value = '';
		document.querySelector('#commentInput').value = '';
		document.querySelector('#tagList').children[0].remove();
		clearTextContent("tag");
	});


});