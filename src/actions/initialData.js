export const initialData = {
	boards: [
		{
			id: "board-1",
			columnOrder: ["column-1", "column-2", "column-3"],
			columns: [
				{
					id: "column-1",
					boardId: "board-1",
					title: "Todo",
					cardOrder: ["card-1", "card-2", "card-3", "card-4", "card-5", "card-6", "card-7"],
					cards: [
						{ id: "card-1", boardId: "board-1", columnId: "column-1", title: "This is card 1", cover: null },
						{ id: "card-3", boardId: "board-1", columnId: "column-1", title: "This is card 3", cover: null },
						{ id: "card-2", boardId: "board-1", columnId: "column-1", title: "This is card 2", cover: null },
						{ id: "card-7", boardId: "board-1", columnId: "column-1", title: "This is card 7", cover: "https://giaitri.vn/wp-content/uploads/2019/11/hot-girl-Nam-%C4%90%E1%BB%8Bnh.jpg" },
						{ id: "card-4", boardId: "board-1", columnId: "column-1", title: "This is card 4", cover: null },
						{ id: "card-6", boardId: "board-1", columnId: "column-1", title: "This is card 6", cover: null },
						{ id: "card-5", boardId: "board-1", columnId: "column-1", title: "This is card 5", cover: null },
					],
				},
				{
					id: "column-2",
					boardId: "board-1",
					title: "Inprogress",
					cardOrder: ["card-8", "card-9", "card-10"],
					cards: [
						{ id: "card-10", boardId: "board-1", columnId: "column-2", title: "This is card 10", cover: "https://giaitri.vn/wp-content/uploads/2019/11/hot-girl-Nam-%C4%90%E1%BB%8Bnh.jpg" },
						{ id: "card-8", boardId: "board-1", columnId: "column-2", title: "This is card 8", cover: null },
						{ id: "card-9", boardId: "board-1", columnId: "column-2", title: "This is card 9", cover: null },
					],
				},
				{
					id: "column-3",
					boardId: "board-1",
					title: "Done",
					cardOrder: ["card-11", "card-12", "card-13", "card-14"],
					cards: [
						{ id: "card-12", boardId: "board-1", columnId: "column-3", title: "This is card 12", cover: "https://giaitri.vn/wp-content/uploads/2019/11/hot-girl-Nam-%C4%90%E1%BB%8Bnh.jpg" },
						{ id: "card-11", boardId: "board-1", columnId: "column-3", title: "This is card 11", cover: null },
						{ id: "card-13", boardId: "board-1", columnId: "column-3", title: "This is card 13", cover: null },
						{ id: "card-14", boardId: "board-1", columnId: "column-3", title: "This is card 14", cover: null },
					],
				},
			]
		}
	],
};
