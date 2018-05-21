import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { GameService } from 'src/app/shared/game.service';
import { Cell } from 'src/app/shared/cell-model';
import { handleClickResponse } from 'src/app/shared/handle-click-response-model';
import { Router } from '@angular/router';
import { WinModalComponent } from 'src/app/gomoku/win-modal/win-modal.component';

@Component({
  selector: 'app-gomoku',
  templateUrl: './gomoku.component.html',
  styleUrls: ['gomoku.component.scss']
})
export class GomokuComponent implements OnInit {
  player1: any;
  player2: any;
  playerTurn: number;
  count: number;


  constructor(
    private gameService: GameService,
    private dialog: MatDialog,
    private router: Router 
  ) { }

  ngOnInit() {
    this.player1 = this.gameService.player1;
    this.player2 = this.gameService.player2;
    this.gameService.generateMatrix();
    this.playerTurn = 1;
    this.count = 1;
  }
  /**
   * Style
   */
  getNameStyle(player: number) {
    if (player === 1) {
      return this.playerTurn === 1 ? `{background-color: ${this.player1.color}}` : `{ border: 1px solid ${this.player1.color}}`
    } else {
      return this.playerTurn === 2 ? `{ border: 1px solid ${this.player2.color}}` : `{background-color: ${this.player2.color}}`
    }

  }

  /**
   * Game logic
   */
  onCellClick(cell: Cell) {
    const result: handleClickResponse = this.gameService.handleCellClick(cell, this.playerTurn);
    if (result.win) {
      this.openWinDialog();

    } else if (result.handled) {
      this.handleTurn();
    }
  }

  private handleTurn() {
    if (this.playerTurn === 2) {
      this.count++;
      this.playerTurn = 1;
    } else {
      this.playerTurn = 2;
    }
  }
  /**
   * Buttons
   */
  public onNew() {
    this.playerTurn = 1;
    this.count = 1;
    this.gameService.setDefault();
    this.gameService.generateMatrix();
  }

  public onBackClick() {
    this.playerTurn = 1;
    this.count = 1;
    this.gameService.setDefault();
    this.router.navigateByUrl('home')
  }
  /**
   * Dialog
   */
  openWinDialog() {
    let dialogRef = this.dialog.open(WinModalComponent, {
      height: '350px',
      width: '450px',
      data: {
        player: this.playerTurn === 1 ? this.player1.name : this.player2.name,
        turn: this.count
      }
    });
    dialogRef.afterClosed().subscribe((startNew: boolean) => {
      if (startNew) {
        this.onNew();
      } else {
        this.onBackClick();
      }
    })
  }


}
